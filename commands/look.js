'use strict';

module.exports = exports = (orb) => {
  orb.color('red');
  return setInterval(() => {
    var look = Math.floor(Math.random() * 180);
    orb.roll(0, look);
  }, 500);
};
