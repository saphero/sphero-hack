'use strict';

module.exports = exports = (orb) => {
  orb.color('yellow');
  var count = 0;
  return setInterval(() => {
    var deg = count % 2 ? 0 : 180;
    count++;
    orb.roll(250, deg);
  }, 500);
};
