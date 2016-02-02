'use strict';

const setupBB8 = require(__dirname + '/../setup/setup-bb8');
const setupSphero = require(__dirname + '/../setup/setup-sphero');
const connectFn = require(__dirname + '/device-config');
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');
var orb;
var speed = 200;
const max = 250;
const min = 10;
const interval = 10;

module.exports = exports = (io) => {
  io.on('connection', socket => {

    socket.on('connect-btn-sprk', () => {
      setupSphero(() => {
        orb = connectFn.spheroConnect();
        console.log('second');
        orb.connect(() => {
          console.log('connected!');
          socket.emit('connected-sphero');
          orb.roll(100, 0, () => {
            console.log('performed roll');
          });
        });
      });
      console.log('first');
    });

    socket.on('setup-bb8', () => {
      setupBB8(() => {
        console.log('setup callback');
        orb = connectFn.bb8Connect();
      });
    });

    socket.on('connect-bb8', () => {
      console.log('received event');
      orb.connect(() => {
        console.log('connected!');
        orb.roll(100, 0, () => {
          console.log('performed roll');
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

    socket.on('roll', direction => {
      switch (direction) {
        case 'left':
          orb.setHeading(0, () => {
            orb.roll(speed, 270);
            orb.randomColor();
            console.log('left');
          });
          break;
        case 'up':
          orb.setHeading(0, () => {
            orb.roll(speed, 0);
            orb.randomColor();
            console.log('up');
          });
          break;
        case 'right':
          orb.setHeading(0, () => {
            orb.roll(speed, 90);
            orb.randomColor();
            console.log('right');
          });
          break;
        case 'down':
          orb.setHeading(0, () => {
            orb.roll(speed, 180);
            orb.randomColor();
            console.log('down');
          });
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

    socket.on('speed', direction => {
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

    socket.on('color', color => {
      orb.color('#' + color);
    });

  });
};
