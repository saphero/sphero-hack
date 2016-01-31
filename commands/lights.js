module.exports = exports = (orb) => {
  console.log('getting to this file');
  setInterval(() => {
    orb.randomColor();
  }, 500);
};
