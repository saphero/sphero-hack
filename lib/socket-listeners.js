'use strict';

const setupBB8 = require(__dirname + '/../setup/setup-bb8');
const setupSphero = require(__dirname + '/../setup/setup-sphero');
const connectFn = require(__dirname + '/device-config');
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const dance = require(__dirname + '/../commands/dance');
const fly = require(__dirname + '/../commands/fly');
const magic8 = require(__dirname + '/../commands/magic8');
const moveRandom = require(__dirname + '/../commands/move-random');
const collision = require(__dirname + '/../commands/collision');
const speedometer = require(__dirname + '/../commands/speedometer');
const accelerometer = require(__dirname + '/../commands/accelerometer');
const gyroscope = require(__dirname + '/../commands/gyroscope');
var speed = 160;
const max = 250;
const min = 10;
const speedChange = 10;
var interval;

module.exports = exports = (io, orb) => {
  io.on('connection', (socket) => {
    if (typeof orb !== 'undefined') {
      gyroscope(orb, socket);
      speedometer(orb, socket);
      accelerometer(orb, socket);
    }
    socket.on('connect-btn-sprk', () => {
      setupSphero(() => {
        orb = connectFn.spheroCreate();
        orb.connect(() => {
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
        var ninja = connectFn.bb8Create();
        orb = {};
        ninja.connect(() => {
          console.log('connected!');
          socket.emit('connected-bb8');
          ninja.roll(100, 0, () => {
            console.log('performed roll');
          });
          orb = ninja;
        });
      });
    });

    socket.on('roll', (data) => {
      console.log(data.direction);
      switch (data.direction) {
        case 'left':
          interval = rollDirection(orb, true, 270, socket);
          break;
        case 'up':
          interval = rollDirection(orb, false, 0, socket);
          break;
        case 'right':
          interval = rollDirection(orb, true, 90, socket);
          break;
        case 'down':
          interval = rollDirection(orb, true, 180, socket);
          break;
        case 'stop':
          if (interval) clearInterval(interval);
          orb.stop(() => {
            console.log('stopped');
          });
          break;
        default:
          console.log('received unrecognized event');
      }
    });

    socket.on('free-roll', (data) => {
      console.log(data.deg);
      rollDirection(orb, true, data.deg, socket);
    });

    socket.on('speed', (direction) => {
      if (direction === 'up') {
        if (speed === max) return console.log('at max speed');
        speed += speedChange;
        orb.roll(speed);
        console.log('speed up');
      }
      if (direction === 'down') {
        if (speed === min) return console.log('at min speed');
        speed -= speedChange;
        orb.roll(speed);
        console.log('speed down');
      }
      socket.emit('speed-change');
    });

    socket.on('color', (color) => {
      orb.color('#' + color);
    });

    socket.on('preset', (command) => {
      console.log('command: ' + command.name);
      clearInterval(interval);
      switch (command.name) {
        case 'rainbow':
          interval = lights.rainbow(orb);
          break;
        case 'xmas':
          interval = lights.xmas(orb);
          break;
        case 'disco':
          interval = lights.disco(orb);
          break;
        case 'dance':
          interval = dance(orb);
          break;
        case 'look':
          interval = look(orb);
          break;
        case 'move-random':
          interval = moveRandom(orb);
          break;
        case 'collision':
          interval = collision(orb);
          break;
        case 'fly':
          interval = fly(orb);
          break;
        case 'magic8':
          interval = magic8(orb);
          break;
        default:
          console.log('received unrecognized event');
      }
      if (command.test) clearInterval(interval);
      socket.emit('preset-executed', command.name);
    });
  });
};

function rollDirection(orb, resetHeading, degrees, socket, cb) {
  if (resetHeading) {
    orb.setHeading(0, () => {
      orb.roll(speed, degrees);
      orb.randomColor();
      if (cb) cb();
    });
  } else {
    orb.roll(speed, degrees);
    orb.randomColor();
    if (cb) cb();
  }
  socket.emit('rolled');
}

exports.rollDirection = rollDirection;
