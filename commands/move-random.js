'use strict';

module.exports = exports = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Connected to ' + config.orb_LOCAL_NAME);
      console.log('Command: move-random');
      orb.color('#00ffab');
      setInterval(() => {
        var direction = Math.floor(Math.random() * 360);
        orb.roll(1000, direction);
        console.log(direction);
      }, 1000);
    });
  }
};
