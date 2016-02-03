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

/* ----- can i just register an event here? ----- */
socket.on('connected-sphero', () => {
  swal({
    title: 'Ready to go!',
    text: 'Your Sphero is now connected.',
    type: 'success',
    confirmButtonText: 'Let\'s explore!',
    confirmButtonColor: '#36B4C2',
    customClass: 'setup-modal'
  },
  () => {
    $(location).attr('pathname', '/move');
  });
});

$('#connect-btn-sprk').on('click', () => {
  console.log('connecting to sprk');
  socket.emit('connect-btn-sprk');
  swal({
    title: 'Connecting to Sphero...',
    imageUrl: 'static/img/ripple.gif',
    showCancelButton: true,
    showConfirmButton: false,
    customClass: 'setup-modal'
  });
});
