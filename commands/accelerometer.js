'use strict';

module.exports = exports = (orb, socket) => {
  if (!orb) return console.log('orb not found');
  orb.streamAccelerometer();

  orb.on('accelerometer', (data) => {
    var dataArr = [[]];
    if (!data.xAccel.value[0] || !data.yAccel.value[0]) {
      dataArr[0].push([0, 0]);
    } else {
      dataArr[0].push([data.xAccel.value[0], data.yAccel.value[0]]);
    }
    socket.emit('accelerometer', dataArr);
  });
};
