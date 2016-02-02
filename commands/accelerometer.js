'use strict';

module.exports = exports = (orb) => {
  orb.streamAccelerometer();

  orb.on('accelerometer', (data) => {
    console.log('accelerometer:');
    // console.log('  sensor:', data.xAccel.sensor);
    // console.log('    range:', data.xAccel.range);
    // console.log('    units:', data.xAccel.units);
    console.log('    value:', data.xAccel.value[0]);

    // console.log('  sensor:', data.yAccel.sensor);
    // console.log('    range:', data.yAccel.range);
    // console.log('    units:', data.yAccel.units);
    console.log('    value:', data.yAccel.value[0]);

    // console.log('  sensor:', data.zAccel.sensor);
    // console.log('    range:', data.zAccel.range);
    // console.log('    units:', data.zAccel.units);
    console.log('    value:', data.zAccel.value[0]);
  });
};
