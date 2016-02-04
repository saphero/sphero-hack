'use strict';
/* global io swal */

var socket = io.connect('http://localhost:3000');
var idleTimeout;

function confirmConnect() {
  if (idleTimeout) clearTimeout(idleTimeout);
  swal({
    title: 'Ready to go!',
    text: 'Your Sphero is now connected.',
    type: 'success',
    confirmButtonText: 'Let\'s explore!',
    confirmButtonColor: '#36B4C2',
    customClass: 'setup-modal'
  }, () => {
    $(location).attr('pathname', '/move');
  });
}

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
  }, function(isConfirm) {
    if (!isConfirm) clearTimeout(idleTimeout);
  });
  idleError($('#connect-btn-sprk'));
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
  }, function(isConfirm) {
    if (!isConfirm) clearTimeout(idleTimeout);
  });
  idleError($('#connect-btn-bb8'));
});

function idleError($btn) {
  idleTimeout = setTimeout(() => {
    swal({
      title: 'Connection failed',
<<<<<<< HEAD
      text: 'There is a problem connnecting to your Sphero. '
        + 'Make sure your Bluetooth is on and your Sphero is awake.',
=======
      text: 'There is a problem connnecting to your Sphero. Make sure your Bluetooth is on and your Sphero is awake.',
>>>>>>> 4131583e0ec8d335ab8828ca7def09c5d5c58b65
      type: 'error',
      confirmButtonText: 'Try again!',
      confirmButtonColor: '#36B4C2',
      showCancelButton: true,
      customClass: 'setup-modal',
      closeOnConfirm: false
    }, () => {
      $btn.trigger('click');
    });
  }, 7000);
}
