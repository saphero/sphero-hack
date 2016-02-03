'use strict';

// var sphero = require("../");
// var orb = sphero(process.env.PORT);
//
// orb.connect(function() {
//   setInterval(function() {
//     var direction = Math.floor(Math.random() * 360);
//     orb.roll(150, direction);
//   }, 1000);
// });
//
// var danceRandomHex = function() {
//   var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
// };

//randomColor function as an export

module.exports = exports = (orb) => {
  orb.color('yellow');
  function randomDance(direction, interval) {
    console.log(direction, interval);
    return setTimeout(() => {
      // orb.roll(150, direction);
      randomDance(Math.floor(Math.random() * 360), Math.floor(Math.random() * 1500));
    }, interval);
  };
  randomDance(Math.floor(Math.random() * 360), Math.floor(Math.random() * 1500));
};
