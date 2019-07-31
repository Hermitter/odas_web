# Raspberry Pi ODAS Setup
1. setup MATRIX Creator.
2. Install [ODAS](https://www.hackster.io/matrix-labs/direction-of-arrival-for-matrix-voice-creator-using-odas-b7a15b).
​
3. edit the raspberry pi `/etc/rc.local` file to contain
```
# Autostart ODAS
/home/pi/odas/bin/odaslive -vc /home/pi/odas/config/odaslive/matrix_creator.cfg &
```
​
# Raspberry Pi Sensor/Mic Recording
1. setup MATRIX Creator
2. install lite-js
3. npm install socket.io-client socket.io express --save
​
# ODAS Computer App
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