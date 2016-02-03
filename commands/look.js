'use strict';

module.exports = exports = (orb) => {
  console.log('Command: move-random');
  orb.color('red');
  return setInterval(() => {
    var moveHead = Math.floor(Math.random() * 180);
    console.log(moveHead);
    orb.roll(0, moveHead);
  }, 500);
};
