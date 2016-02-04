'use strict';

module.exports = exports = (orb) => {
  orb.color('#00ffab');
  return setInterval(() => {
    var direction = Math.floor(Math.random() * 360);
    orb.roll(1000, direction);
  }, 1000);
};
