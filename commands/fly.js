'use strict';

module.exports = exports = (orb) => {
  orb.detectFreefall();

  orb.on('freefall', (data) => {
    orb.color('purple');
  });

  orb.on('landed', (data) => {
    orb.color('red');
  });
};
