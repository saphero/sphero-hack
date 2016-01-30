var command = process.argv[2];

const setupBB8 = require(__dirname + '/setup/setup-bb8');
const setupSphero = require(__dirname + '/setup/setup-sphero');
const keypress = require(__dirname + '/commands/keypress');

if (command.length < 2) {
  console.log('Please input a valid command');
}

switch (command) {
  case 'setupBB8':
    setupBB8();
    break;
  case 'setupSphero':
    setupSphero();
    break;
  case 'keypress':
    keypress();
    break;
  default:
    console.log('Try again');
}
// logan, i know how much you like switch statements :D
