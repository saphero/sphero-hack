'use strict';

module.exports = exports = (orb) => {
  orb.detectCollisions();

  orb.color('teal');
  orb.roll(155, Math.floor(Math.random() * 360));

  var collisionObj = {
    collision: () => {
      orb.color('red');
      setTimeout(() => {
        orb.color('teal');
      }, 1000);
    }
  };

  orb.on('collision', collisionObj.collision);

  return collisionObj;
};
