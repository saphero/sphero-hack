'use strict';

module.exports = exports = (orb, socket) => {
  if (!orb) return;
  orb.streamVelocity();
  var dataArr = [[]];
  var count = 0;

  orb.on('velocity', (data) => {
    if (!data.xVelocity.value[0] || !data.yVelocity.value[0]) {
      dataArr[0].push([count, 0]);
    } else {
      var speed = Math.sqrt(Math.pow(data.xVelocity.value[0], 2),
        Math.pow(data.yVelocity.value[0], 2));
      console.log(speed);
      dataArr[0].push([count, speed]);
    }
    if (dataArr[0].length > 50) {
      dataArr[0] = dataArr[0].slice(dataArr[0].length - 50);
    }
    console.log(dataArr[0].length);
    count++;
    socket.emit('speedometer', dataArr);
  });
};
