// const orb = require(__dirname + '/../lib/device-config')();
// const keypress = require('keypress');
//
// module.exports = exports = () => {
//   orb.connect(listen);
//   var speed = 200;
//   var max = 250;
//   var min = 10;
//
//   function handle(ch, key) {
//     var stop = orb.roll.bind(orb, 0, 0);
//
//     if (key.ctrl && key.name === 'c') {
//       process.stdin.pause();
//       process.exit();
//     }
//
//     if (key.name === 'p') {
//       if (speed === 250) return console.log('at max speed');
//       speed += 10;
//       orb.roll(speed);
//       console.log('speed up');
//     }
//
//     if (key.name === 'o') {
//       if (speed === 10) return console.log('at min speed');
//       speed -= 10;
//       orb.roll(speed);
//       console.log('speed down');
//     }
//
//     if (key.name === 'up' || key.name === 'w') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 0);
//         orb.randomColor();
//         console.log('up');
//       });
//     }
//
//     if (key.name === 'down' || key.name === 's') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 180);
//         orb.randomColor();
//         console.log('down');
//       });
//     }
//
//     if (key.name === 'left' || key.name === 'a') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 270);
//         orb.randomColor();
//         console.log('left');
//       });
//     }
//
//     if (key.name === 'right' || key.name === 'd') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 90);
//         orb.randomColor();
//         console.log('right');
//       });
//     }
//
//     if (key.name === 'e') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 45);
//         orb.randomColor();
//         console.log('up-right');
//       });
//     }
//
//     if (key.name === 'q') {
//       orb.setHeading(0, () => {
//         orb.roll(speed, 315);
//         orb.randomColor();
//         console.log('up-left');
//       });
//     }
//
//     if (key.name === 'space') {
//       stop();
//       console.log('stop');
//       orb.color('red');
//     }
//   }
//
//   function listen() {
//     keypress(process.stdin);
//     process.stdin.on('keypress', handle);
//
//     console.log('Start controlling with keypress');
//
//     process.stdin.setRawMode(true);
//     process.stdin.resume();
//   }
// };
