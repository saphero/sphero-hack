'use strict';

exports.rainbow = (orb) => {
  var frequency = 0.3;
  var r, g, b;
  var count = 0;
  function nextRainbow() {
    r = Math.floor(Math.sin(frequency * count + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * count + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * count + 4) * 127 + 128);
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
  return setInterval(() => {
    if (count % 2) {
      orb.color('green');
    } else {
      orb.color('red');
    }
    count++;
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
    count++;
  }, 250);
};
