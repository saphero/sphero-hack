'use strict';

module.exports = exports = (orb) => {
  orb.connect(() => {
    orb.detectCollisions();
    orb.color('green');

    orb.on('collision', (data) => {
      console.log('collision detected');
      console.log('  data:', data);

      orb.color('red');

      setTimeout(() => {
        orb.color('green');
      }, 1000);
    });

    orb.roll(155, 0);
  });
};
