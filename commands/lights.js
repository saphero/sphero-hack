'use strict';

module.exports = exports = (orb) => {
  return setInterval(() => {
    orb.randomColor();
  }, 500);
};
