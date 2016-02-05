'use strict';

module.exports = exports = (orb) => {
  orb.detectCollisions();
  orb.color('teal');

  orb.on('collision', () => {
    orb.color('red');

    setTimeout(() => {
      orb.color('teal');
    }, 1000);
  });

  orb.roll(155, Math.floor(Math.random() * 360));
};
