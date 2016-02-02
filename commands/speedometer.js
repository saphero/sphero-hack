'use strict';

module.exports = exports = (orb) => {
  orb.streamVelocity();

  orb.on('velocity', (data) => {
    console.log('velocity:');
    console.log('    value:', data.xVelocity.value[0]);
    console.log('    value:', data.yVelocity.value[0]);
  });
};
