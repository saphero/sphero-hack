'use strict';

module.exports = exports = (orb) => {
  orb.color('blue');
  var counter = 0;
  return setInterval(() => {
    orb.roll(100, counter);
    counter = counter + 15;
    if (counter >= 360) return;
    console.log(counter);
  }, 500);
};
