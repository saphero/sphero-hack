# sphero-hack
#### A Code Fellows 401 Project by [Natalie Chow](https://github.com/xxnatc), [Sabrina Tee](https://github.com/sabbyt/), [Logan Tegman](https://github.com/ltegman), [Jose Tello](https://github.com/josectello) and [Jesse Thach](https://github.com/jessethach).

### Minimum Requirements
- Bluetooth Classic (Bluetooth 2.0/3.0) enabled computer
- A [Sphero 1.0/2.0](http://www.sphero.com/sphero) or [SPRK](http://www.sphero.com/education)

### Installation
Download from npm:
```
npm install saphero
```
Or clone directly from Github: [https://github.com/saphero/sphero-hack](https://github.com/saphero/sphero-hack)

### Getting Started
- Pair Sphero via bluetooth (found in System Preferences > Bluetooth - but first ensure Sphero is not connected to any another device)
- ```npm install```
- ```gulp sass```
- Launch ```node server.js```
- Open browser at ```localhost:3000``` or at specified port

### Features
- Client-side dashboard for easy Sphero connection and control
- Back-end server that listens to your commands and sends them to your device
- Connects and sets up a device at a click of a button!
- Move your Sphero using keypress or a game controller
- Preset basic commands and colors
- Color picker

### Routes
Device setup and connection page:
```
localhost:3000```
Game controller and keypress control:
```
/move```
Preset colors and color picker:
```
/color```

About the contributors:
```
/about```

### Acknowledgements & Modules Used
- [express](https://www.npmjs.com/package/express)
- [home-config](https://www.npmjs.com/package/home-config)
- [jade](https://www.npmjs.com/package/jade)
- [keypress](https://www.npmjs.com/package/keypress)
- [lodash](https://www.npmjs.com/package/lodash)
- [noble](https://www.npmjs.com/package/noble)
- [serialport](https://www.npmjs.com/package/serialport)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [sphero](https://www.npmjs.com/package/sphero)
- [sweetalert](https://www.npmjs.com/package/sweetalert)

### Issues? Suggestions? Comments?
Submit an issue on [Github](https://github.com/saphero/sphero-hack/issues).

### License
The MIT License (MIT).

Copyright (c) 2016 [Natalie Chow](https://github.com/xxnatc), [Sabrina Tee](https://github.com/sabbyt/), [Logan Tegman](https://github.com/ltegman), [Jose Tello](https://github.com/josectello) and [Jesse Thach](https://github.com/jessethach).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
