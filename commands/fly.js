'use strict';

module.exports = exports = (orb) => {
  orb.connect(() => {
    orb.detectFreefall();

    orb.on('freefall', (data) => {
      console.log('freefall detected');
      orb.color('purple');
    });

    orb.on('landed', (data) => {
      console.log('landing detected');
      orb.color('red');
    });
  });
};
