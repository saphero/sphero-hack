# orbotix-hack

#### A Client-Side Dashboard to Easily Connect and Control Sphero/BB-8/Ollie Devices

#### A [Code Fellows](https://www.codefellows.org/) 401 Project by [Natalie Chow](https://github.com/xxnatc), [Sabrina Tee](https://github.com/sabbyt/), [Logan Tegman](https://github.com/ltegman), [Jose Tello](https://github.com/josectello) and [Jesse Thach](https://github.com/jessethach).

![Control Page](/public/img/setup-screenshot.png)

### Minimum Requirements
- For Sphero 1.0/2.0/SPRK models: Bluetooth Classic (Bluetooth 2.0/3.0) enabled computer
- For BB-8/Ollie models: Bluetooth Low Energy (Bluetooth LE/Bluetooth Smart/Bluetooth 4.0/4.1) enabled computer
- Currently only Mac OS X platform compatible
- [Xcode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12)
- A [Sphero 1.0/2.0](http://www.sphero.com/sphero), [SPRK](http://www.sphero.com/education), [BB-8](http://www.sphero.com/starwars) or [Ollie](http://www.sphero.com/ollie)

### Installation
Download from npm:
```
npm install saphero
```
Or clone directly from Github: [https://github.com/saphero/sphero-hack](https://github.com/saphero/sphero-hack)

### Getting Started
- Pair Sphero or SPRK via bluetooth (found in System Preferences > Bluetooth - but first ensure Sphero/SPRK is not connected to any another device)
- You do not need to pair BB-8 or Ollie devices
- ```npm install```
- ```gulp sass```
- Launch ```npm start```
- Open browser at ```localhost:3000``` (it should open automatically) and follow the instructions

### Features
- Client-side dashboard for easy Sphero/SPRK/BB-8/Ollie connection and control
- Back-end server that listens to your commands and sends them to your device
- Connects and sets up a device at a click of a button!
- Move your device using keypress or a game controller (game controller only compatible on [Firefox Nightly](https://nightly.mozilla.org/) browser)
- Graphs speed and acceleration
- Preset commands and colors
- Color picker

### Game Controller
- Install the [Firefox Nightly](https://nightly.mozilla.org/) browser
- Launch server ```npm start```
- Connect device
- Plugin a game controller and ensure you are on the ```/move``` page
- Use arrow buttons or right joystick to control the direction of device
- ◯ and R1 increases speed
- ▢ and L1 decreases speed
- Left joystick changes color based on the color picker

### Routes
Device setup and connection page:
```
localhost:3000
```

| Routes        | Description                          |
| :-----------  | ------------------------------------ |
| ```/move```   | Game controller and keypress control |
| ```/color```  | Preset colors and color picker       |
| ```/preset``` | Preset commands                      |
| ```/about```  | About the contributors               |

### Acknowledgements & Modules Used
- [express](https://www.npmjs.com/package/express)
- [home-config](https://www.npmjs.com/package/home-config)
- [jade](https://www.npmjs.com/package/jade)
- [lodash](https://www.npmjs.com/package/lodash)
- [noble](https://www.npmjs.com/package/noble)
- [opn](https://www.npmjs.com/package/opn)
- [serialport](https://www.npmjs.com/package/serialport)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [sphero](https://www.npmjs.com/package/sphero)

### Issues? Suggestions? Comments?
Submit an issue on [Github](https://github.com/saphero/sphero-hack/issues).

Checkout out our [Developer's Notes](https://github.com/saphero/sphero-hack/blob/master/DEV_NOTES.md).

### Legal Notices
This work is not endorsed by Orbotix.

Trademarks are the property of their respective owners.

### License
MIT Licensed. For more details, see the LICENSE file.
