'use strict';

module.exports = exports = (orb) => {
  orb.detectFreefall();

  orb.on('freefall', () => {
    orb.color('purple');
  });

  orb.on('landed', () => {
    orb.color('red');
  });
};
