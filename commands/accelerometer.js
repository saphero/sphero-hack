'use strict';

module.exports = exports = (orb, socket) => {
  if (!orb) return console.log('orb not found');
  orb.streamAccelerometer();

  orb.on('accelerometer', (data) => {
    var dataArr = [[]];
    console.log('accelerometer:');
    console.log('    value:', data.xAccel.value[0]);
    console.log('    value:', data.yAccel.value[0]);
    console.log('    value:', data.zAccel.value[0]);
    if (!data.xAccel.value[0] || !data.yAccel.value[0]) {
      dataArr[0].push([0, 0]);
    } else {
      dataArr.push([data.xAccel.value[0], data.yAccel.value[0]]);
    }
    socket.emit('accelerometer', dataArr);
  });
};
