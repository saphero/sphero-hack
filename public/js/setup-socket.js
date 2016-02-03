'use strict';

/* eslint-disable no-undef */
var socket = io.connect('http://localhost:3000');
/* eslint-enable no-undef */

function confirmConnect() {
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
};

socket.on('connected-sphero', confirmConnect);
socket.on('connected-bb8', confirmConnect);

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

$('#connect-btn-bb8').on('click', () => {
  console.log('connecting to bb8');
  socket.emit('connect-btn-bb8');
  setTimeout(() => {
    socket.emit('connect-btn-bb8');
  }, 2000);
  swal({
    title: 'Connecting to BB-8/Ollie...',
    imageUrl: 'static/img/ripple.gif',
    showCancelButton: true,
    showConfirmButton: false,
    customClass: 'setup-modal'
  });
});
