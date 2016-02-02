'use strict';

/* eslint-disable no-undef */
var socket = io.connect('http://localhost:3000');
/* eslint-enable no-undef */

document.getElementById('connect-btn-sprk')
  .onclick = () => socket.emit('connect-btn-sprk');
// document.getElementById('disconnect')
//   .onclick = () => socket.emit('disconnect');
// document.getElementById('bb8Setup').onclick = () => socket.emit('setup-bb8');
// document.getElementById('bb8Connect')
//   .onclick = () => socket.emit('connect-bb8');
