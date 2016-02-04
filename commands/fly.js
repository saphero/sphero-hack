'use strict';

module.exports = exports = (orb) => {
  orb.detectFreefall();

  orb.on('freefall', (data) => {
    console.log('freefall detected', data);
    orb.color('purple');
  });

  orb.on('landed', (data) => {
    console.log('landing detected', data);
    orb.color('red');
  });
};
