'use strict';
var start = false;
module.exports = exports = (orb) => {
  orb.color('purple');

  orb.streamVelocity();

  orb.on('velocity', (data) => {
    console.log(data.xVelocity.value[0], data.yVelocity.value[0]);
    if (data.xVelocity.value[0] > 100 || data.yVelocity.value[0] > 100) {
      console.log('shaking');
      start = true;
    } else if (start) {
      predict();
      start = false;
    }
  });

  function predict() {
    var number = Math.random() * 3;
    if (number < 1) {
      console.log('YES');
      return orb.color('green');
    }
    if (number < 2) {
      console.log('MAYBE');
      return orb.color('yellow');
    }
    console.log('NO');
    return orb.color('red');
  }
};
