// ///////////////////////////////////////
// // SENSOR & MIC RECORDING SERVER /////
// /////////////////////////////////////
console.log("Starting Server")
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var mic = require('mic');
var fs = require('fs');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var matrix = require('@matrix-io/matrix-lite');

var mics = micInit();
var micStream = mics.getAudioStream();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    var record = false;
    var writer = undefined;
    var micWriter = undefined;
    
    console.log('a user connected');
    console.log("sending sensor data ...");

    setInterval(() => {
      // send to ODAS app
      socket.emit("sensors", {
        "imu": matrix.imu.read(),
        "pressure": matrix.pressure.read(),
        "humidity": matrix.humidity.read()
      });

      // save to csv file
      if(record){saveSensors(writer);}
    }, 2000);


    // create csv & begin audio recoding
    socket.on("start record", ()=>{
      console.log("recording ...");
      var d = new Date();
      writer = createFiles(d.toUTCString());

      micWriter = fs.WriteStream(d.toUTCString()+'.wav');
      mics.start();
      micStream.pipe(micWriter);

      record = true;
    });
    // stop recording and reset vars
    socket.on("stop record", ()=>{
      mics.stop();
      console.log("stopped recoding");
      writer = undefined;
      record = false;
    });

    socket.on("disconnect", ()=>{
      mics.stop();
      console.log("lost connection.. saving data");
      writer = undefined;
      record = false;
    });
});

http.listen(3000, function(){
  console.log('listening now on *:3000');
});

/////////////////////
// RECORDING
////////////////////

// - create csv & audio record file
function createFiles(filename){
  // Date/Time in UTC
  var csvWriter = createCsvWriter({
      path: filename+'.csv',
      header: [
        {id: 'time', title: 'Time UTC (H/M/S)'},
        {id: 'temperature', title: 'Temperature'},
        {id: 'pressure', title: 'Pressure'},
        {id: 'altitude', title: 'Altitude'},
        {id: 'humidity', title: 'Humidity'},
        {id: 'magX', title: 'MagnetometerX'},
        {id: 'magY', title: 'MagnetometerY'},
        {id: 'magZ', title: 'MagnetometerZ'}
      ]
  });

  return csvWriter;
}

// - append to sensor .csv
function saveSensors(writer){
  var timeNow = new Date();
  var data = [{
    time: timeNow.getUTCHours()+":"+timeNow.getUTCMinutes()+":"+timeNow.getUTCSeconds(),
    temperature: matrix.humidity.read().temperature,
    pressure: matrix.pressure.read().pressure,
    altitude: matrix.pressure.read().altitude,
    humidity: matrix.humidity.read().humidity,
    magX: matrix.imu.read().mag_x,
    magY: matrix.imu.read().mag_y,
    magZ: matrix.imu.read().mag_z
  }];
writer.writeRecords(data).then(() => {console.log("saved recent sensors");/*console.log(data);*/});
};

function micInit() {
  return mic({
    // Set default values for any missing configs
    rate:          16000,
    debug:         false,
    endian:        'little',
    bitwidth:      16,
    exitOnSilence: 0,
    device:        'hw:2,0',
    channels:      8
  });
}