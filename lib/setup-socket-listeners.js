'use strict';

const setupBB8 = require(__dirname + '/../setup/setup-bb8');
const setupSphero = require(__dirname + '/../setup/setup-sphero');
const connectFn = require(__dirname + '/device-config');
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');
var orb;

module.exports = exports = (io) => {
  io.on('connection', socket => {
    socket.on('setup-sphero', () => {
      setupSphero();
      orb = connectFn.spheroConnect();
      socket.emit('setup-sphero');
    });

    socket.on('connect-sphero', () => {
      orb.connect(() => {
        console.log('connected!');
        socket.emit('connected-sphero');
        orb.roll(100, 0, () => {
          console.log('performed roll');
        });
      });
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

    socket.on('robot-action', opts => {
      // Send generic command to sphero
      orb[opts.type].apply(orb, [...opts.args,
        () => socket.emit('robot-action-complete', opts.type)]);
    });
  });
};
