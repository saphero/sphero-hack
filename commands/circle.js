'use strict';

module.exports = exports = (orb) => {
  orb.color('blue');
  for (var i = 0; i <= 360; i = i + 15) {
    return setInterval(() => {
      orb.roll(100, i);
    }, 500);
  }
};
