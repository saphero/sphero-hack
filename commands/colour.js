'use strict';

exports.green = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Command: green');
      orb.color('green');
    });
  }
};

exports.blue = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Command: blue');
      orb.color('blue');
    });
  }
};

exports.fuchsia = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Command: fuchsia');
      orb.color('fuchsia');
    });
  }
};

exports.xmas = (orb) => {
  if (orb) {
    orb.connect(() => {
      console.log('Command: xmas');
      var count = 0;
      orb.color('red');
      setInterval(() => {
        if (count === 0) {
          orb.color('green');
          console.log('green');
          count = 1;
          return count;
        }
        if (count === 1) {
          orb.color('red');
          console.log('red');
          count = 0;
          return count;
        }
      }, 1000);
    });
  }
};
