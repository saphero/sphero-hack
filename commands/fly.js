'use strict';

module.exports = exports = (orb) => {
  orb.detectFreefall();

  var fly = {
    freefall: () => orb.color('purple'),
    landed: () => orb.color('red')
  };

  orb.on('freefall', fly.freefall);

  orb.on('landed', fly.landed);

  return fly;
};
