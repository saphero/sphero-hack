'use strict';

module.exports = exports = (orb) => {
  orb.color('#F409CE');
  return setInterval(() => {
    var look = Math.floor(Math.random() * 180);
    orb.roll(0, look);
  }, 500);
};
