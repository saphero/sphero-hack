'use strict';

/* eslint-disable no-undef */
var socket = io.connect('http://localhost:3000');
/* eslint-enable no-undef */

document.getElementById('lights')
  .onclick = () => socket.emit('flashing-lights');
document.getElementById('keyboardControls').onclick = toggleKeyControls();

function toggleKeyControls() {
  if (!window.onkeydown) {
    window.onkeydown = e => {
      switch (e.keyCode) {
        case 32:
          socket.emit('roll', 'stop');
          break;
        case 37:
          socket.emit('roll', 'left');
          break;
        case 38:
          socket.emit('roll', 'up');
          break;
        case 39:
          socket.emit('roll', 'right');
          break;
        case 40:
          socket.emit('roll', 'down');
          break;
        case 79:
          socket.emit('speed', 'down');
          break;
        case 80:
          socket.emit('speed', 'up');
          break;
        default:
          // do nothing
      }
    };
  } else {
    window.onkeydown = null;
  }
}
