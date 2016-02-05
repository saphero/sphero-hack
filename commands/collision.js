'use strict';

module.exports = exports = (orb) => {
    orb.detectCollisions();
    orb.color('teal');

    orb.on('collision', (data) => {
      orb.color('red');

      setTimeout(() => {
        orb.color('orange');
      }, 1000);
    });

    orb.roll(155, 0);
};
