'use strict';

const setupBB8 = require(__dirname + '/../setup/setup-bb8');
const setupSphero = require(__dirname + '/../setup/setup-sphero');
const connectFn = require(__dirname + '/device-config');
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');
const speedometer = require(__dirname + '/../commands/speedometer');
const accelerometer = require(__dirname + '/../commands/accelerometer');
const gyroscope = require(__dirname + '/../commands/gyroscope');
var orb;
var speed = 200;
const max = 250;
const min = 10;
const interval = 10;

module.exports = exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('connect-btn-sprk', () => {
      setupSphero(() => {
        orb = connectFn.spheroCreate();
        orb.connect(() => {
          speedometer(orb);
          accelerometer(orb);
          gyroscope(orb);
          console.log('connected!');
          socket.emit('connected-sphero');
          orb.roll(100, 0, () => {
            console.log('performed roll');
          });
        });
      });
    });

    socket.on('connect-btn-bb8', () => {
      setupBB8(() => {
        var ninja = connectFn.bb8Connect();
        orb = {};
        ninja.connect(() => {
          ninja.color('orange');
          orb = ninja;
        });
      });
    });

    socket.on('flashing-lights', () => {
      lights(orb);
      socket.emit('flashing-lights');
    });

    socket.on('look', () => {
      look(orb);
      socket.emit('look');
    });

    socket.on('move-random', () => {
      moveRandom(orb);
      socket.emit('move-random');
    });

    socket.on('roll', (data) => {
      console.log(data.direction);
      switch (data.direction) {
        case 'left':
          rollDirection(data.resetHeading, 270);
          break;
        case 'up':
          rollDirection(false, 0);
          break;
        case 'right':
          rollDirection(data.resetHeading, 90);
          break;
        case 'down':
          rollDirection(data.resetHeading, 180);
          break;
        case 'stop':
          orb.stop(() => {
            console.log('stopped');
          });
          break;
        default:
          console.log('received unrecognized event');
      }
    });

    socket.on('speed', (direction) => {
      if (direction === 'up') {
        if (speed === max) return console.log('at max speed');
        speed += interval;
        orb.roll(speed);
        console.log('speed up');
      }
      if (direction === 'down') {
        if (speed === min) return console.log('at min speed');
        speed -= interval;
        orb.roll(speed);
        console.log('speed down');
      }
    });

    socket.on('color', (color) => {
      orb.color('#' + color);
    });

  });
};

function rollDirection(resetHeading, degrees) {
  if (resetHeading) {
    orb.setHeading(0, () => {
      orb.roll(speed, degrees);
      orb.randomColor();
    });
  } else {
    orb.roll(speed, degrees);
    orb.randomColor();
  }
}
