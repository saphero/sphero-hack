'use strict';

module.exports = exports = (orb) => {
  orb.connect(() => {
    orb.color('purple');

    orb.streamVelocity();

    orb.on('velocity', (data) => {
      console.log(data);
      setTimeout(() => {
        if (data.xVelocity.value[0] === 0) {
          console.log('still');
          predict();
        } else {
          console.log('shaking');
        }
      }, 10000);
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
      if (number <= 3) {
        console.log('NO');
        return orb.color('red');
      }
    }
  });
};
