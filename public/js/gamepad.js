'use strict';

window.addEventListener('gamepadconnected', () => {
  console.log('Gamepad connected');
});

window.addEventListener('gamepaddisconnected', () => {
  console.log('Gamepad disconnected');
});

window.addEventListener('gamepadbuttondown', (e) => {
  console.log('Button down: ' + e.button);
  switch (e.button) {
    case 14:
      socket.emit('roll', { direction: 'up', resetHeading });
      highlightBtn('#up-btn');
      break;
    case 15:
      socket.emit('roll', { direction: 'down', resetHeading });
      highlightBtn('#down-btn');
      break;
    case 16:
      socket.emit('roll', { direction: 'left', resetHeading });
      highlightBtn('#left-btn');
      break;
    case 17:
      socket.emit('roll', { direction: 'right', resetHeading });
      highlightBtn('#right-btn');
      break;
    case 0: // square
    case 4: // L1
      socket.emit('speed', 'down');
      highlightBtn('#slow-btn');
      break;
    case 2: // circle
    case 5: // R1
      socket.emit('speed', 'up');
      highlightBtn('#fast-btn');
      break;
    default:
  }
});

window.addEventListener('gamepadbuttonup', (e) => {
  console.log('Button up: ' + e.button);
  socket.emit('roll', { direction: 'stop' });
  resetHeading = true;
});

// ========== joystick controls ==========
var leftX = 0, leftY = 0;
var rightX = 0, rightY = 0;

window.addEventListener('gamepadaxismove', (e) => {
  // Left joystick: x-axis is #0, y-axis is #1 (reversed)
  // Left joystick is set to control color
  if ([0, 1].indexOf(e.axis) > -1) {
    let x = e.gamepad.axes[0].toFixed(3);
    let y = e.gamepad.axes[1].toFixed(3) * -1;
    if (Math.abs(x - leftX) > 0.45 || Math.abs(y - leftY) > 0.45) {
      console.log('Axes move', e.axis, e.value, x, y);
      leftX = x;
      leftY = y;
      let hue = Math.round(Math.atan2(y, x) * 180 / Math.PI);
      if (hue < 0) hue += 360;
      var hex = hsvToHex({ hue: hue, sat: 0.9, val: 0.9 });
      console.log(hex);
      socket.emit('color', hex);
    }
  }

  // Right joystick: x-axis is #2, y-axis is #5 (reversed)
  // Right joystick is set to control direction
  if ([2, 5].indexOf(e.axis) > -1) {
    let x = Math.abs(e.gamepad.axes[2].toFixed(3));
    let y = Math.abs(e.gamepad.axes[5].toFixed(3));
    if (x - rightX > 0.2 || y - rightY > 0.2) {
      console.log('Axes move', e.axis, e.value, x, y);
      rightX = x;
      rightY = y;
    } else if (rightX > x || rightY > y) {
      rightX = x;
      rightY = y;
    }
    // ...
  }
});

function hsvToHex(hsv) {
  var h = hsv.hue, s = hsv.sat, v = hsv.val;
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v, v, v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [
      v * (1 - s),
      v * (1 - s * (h - i)),
      v * (1 - s * (1 - (h - i)))
    ];
    switch (i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return rgb.map((x) => {
    return ('0' + Math.round(x * 255).toString(16)).slice(-2);
  }).join('');
}
