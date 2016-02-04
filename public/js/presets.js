'use strict';
var socket = io.connect('http://localhost:3000');

$('.card').on('click', 'button', () => {
  socket.emit('preset', { name: $(this).data('preset') });
});

$('#stop-btn').on('click', () => {
  socket.emit('roll', { direction: 'stop' });
});
