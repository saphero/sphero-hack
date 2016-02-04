'use strict';

module.exports = exports = (orb, socket) => {
  orb.streamGyroscope();

  orb.on('gyroscope', (data) => {
    console.log('gyroscope:');
    console.log('    value:', data.xGyro.value[0]);
    console.log('    value:', data.yGyro.value[0]);
    console.log('    value:', data.zGyro.value[0]);
    var dataArr = [[]];
    if (!data.xGyro.value[0] || !data.yGyro.value[0] || !data.zGyro.value[0]) {
      dataArr[0].push([0, 0]);
    } else {
      dataArr.push([0, data.xGyro.value[0]]);
      dataArr.push([1, data.yGyro.value[0]]);
      dataArr.push([2, data.zGyro.value[0]]);
    }
    socket.emit('gyroscope', dataArr);
    console.log(dataArr);
  });
};
