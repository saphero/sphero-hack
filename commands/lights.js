'use strict';

// module.exports = exports = (orb) => {
//   return setInterval(() => {
//     orb.randomColor();
//   }, 500);
// };

exports.rainbow = (orb) => {
  var frequency = 0.3;
  var r, g, b;
  var count = 0;
  function nextRainbow() {
    r = Math.floor(Math.sin(frequency * count + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * count + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * count + 4) * 127 + 128);
    console.log(r, g, b);
    count++;
    if (count === 32) count = 0;
  }
  return setInterval(() => {
    nextRainbow();
    orb.color({ red: r, green: g, blue: b });
  }, 250);
};

exports.xmas = (orb) => {
  var count = 0;
  orb.color('red');
  return setInterval(() => {
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
};

exports.disco = (orb) => {
  var count = 0;
  return setInterval(() => {
    if (count % 2) {
      orb.randomColor();
    } else {
      orb.color('black');
    }
  }, 500);
};
