'use strict';
var socket = io.connect('http://localhost:3000');

$('.card').on('click', 'button', function() {
  console.log($(this).data('preset'));
  socket.emit('preset', $(this).data('preset'));
});
