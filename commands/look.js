'use strict';

module.exports = exports = (orb) => {
  console.log('Command: move-head');
  orb.color('red');
  return setInterval(() => {
    var moveHead = Math.floor(Math.random() * 180);
    orb.roll(0, moveHead);
  }, 500);
};
