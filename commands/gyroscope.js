'use strict';

module.exports = exports = (orb) => {
  orb.streamGyroscope();

  orb.on('gyroscope', (data) => {
    console.log('gyroscope:');
    console.log('    value:', data.xGyro.value[0]);
    console.log('    value:', data.yGyro.value[0]);
    console.log('    value:', data.zGyro.value[0]);
  });
};
