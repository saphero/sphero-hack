'use strict';
var start = false;
module.exports = exports = (orb) => {
  orb.streamVelocity();

  orb.on('velocity', (data) => {
    if (data.xVelocity.value[0] > 100 || data.yVelocity.value[0] > 100) {
      start = true;
    } else if (start) {
      predict();
      start = false;
    }
  });

  function predict() {
    var number = Math.random() * 3;
    if (number < 1) {
      return orb.color('green');
    }
    if (number < 2) {
      return orb.color('yellow');
    }
    return orb.color('red');
  }
};
