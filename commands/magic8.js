'use strict';
var start = false;
module.exports = exports = (orb) => {
  orb.streamVelocity();


  var magic8 = {
    velocity: (data) => {
      if (data.xVelocity.value[0] > 100 || data.yVelocity.value[0] > 100) {
        start = true;
      } else if (start) {
        predict();
        start = false;
      }
    }
  };

  orb.on('velocity', magic8.velocity);

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

  return magic8;
};
