# Raspberry Pi #1 ODAS Setup
Follow the Hackster ODAS guide, but use the repository for the Desktop app.
1. setup MATRIX Creator.
2. Install [ODAS](https://www.hackster.io/matrix-labs/direction-of-arrival-for-matrix-voice-creator-using-odas-b7a15b).
​
3. To run on boot, edit the raspberry pi `/etc/rc.local` file to contain
```
# Autostart ODAS
/home/pi/odas/bin/odaslive -vc /home/pi/odas/config/odaslive/matrix_creator.cfg &
```
​
# Raspberry Pi #2 Sensor/Mic Recording
> These commands are for you second Raspberry Pi.
1. setup MATRIX Creator with [Raspbian Stretch](https://downloads.raspberrypi.org/raspbian/images/raspbian-2019-04-09/)
2. install [matrix-lite-js](https://matrix-io.github.io/matrix-documentation/matrix-lite/getting-started/javascript/)
3. Download the repository
```
git clone https://github.com/Hermitter/odas_web logger
cd logger/recorder
npm install
```
​
# Building the ODAS Computer App
> These commands are for you personal computer.
1. Download [Node.js](https://nodejs.org/en/download/) 
​
2. Download the app
```
git clone https://github.com/Hermitter/odas_web
cd odas_web
npm install grpc --build-from-source
```

3. Start the app
```
npm start
```
​
# Raspberry Pi Sensor/Mic record setup
1. Install MATRIX HAL, Lite, & Kernel Modules
2.