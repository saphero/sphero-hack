'use strict';

/* eslint-disable no-undef */
var socket = io.connect('http://localhost:3000');
/* eslint-enable no-undef */
var resetHeading = true;
toggleKeyControls();

function toggleKeyControls() {
  window.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        socket.emit('roll', { direction: 'left', resetHeading });
        highlightBtn('#left-btn');
        break;
      case 38:
        socket.emit('roll', { direction: 'up', resetHeading });
        highlightBtn('#up-btn');
        break;
      case 39:
        socket.emit('roll', { direction: 'right', resetHeading });
        highlightBtn('#right-btn');
        break;
      case 40:
        socket.emit('roll', { direction: 'down', resetHeading });
        highlightBtn('#down-btn');
        break;
      case 79:
        socket.emit('speed', 'down');
        highlightBtn('#slow-btn');
        break;
      case 80:
        socket.emit('speed', 'up');
        highlightBtn('#fast-btn');
        break;
      default:
    }
  resetHeading = false;
  };
  window.onkeyup = () => {
    socket.emit('roll', { direction: 'stop' });
    resetHeading = true;
  };
}

function highlightBtn(btnId) {
  $(btnId).addClass('active-btn');
  setTimeout(() => {
    $(btnId).removeClass('active-btn');
  }, 150);
}

socket.on('speedometer', (data) => {
  console.log(data);
  $.plot($('#speed_graph'), data, {
    yaxis: {
      min: 0
    },
    xaxis: {
      show: false
    }
  });
});
socket.on('accelerometer', (data) => {
  $.plot($('#accel_graph'), data, {
    yaxis: {
      min: 0
    },
    xaxis: {
      show: false
    }
  });
});
