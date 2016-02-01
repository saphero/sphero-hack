'use strict';

module.exports = exports = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Connected to ' + config.orb_LOCAL_NAME);
      console.log('Command: move-random');
      orb.color('red');
      setInterval(() => {
        var moveHead = Math.floor(Math.random() * 180);
        console.log(moveHead);
        orb.roll(0, moveHead);
      }, 500);
    });
  }
};
