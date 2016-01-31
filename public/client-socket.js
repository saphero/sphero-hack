var socket = io.connect('http://localhost:3000');

document.getElementById('spheroSetup').onclick = () => socket.emit('setup-sphero');
document.getElementById('spheroConnect').onclick = () => socket.emit('connect-sphero');
document.getElementById('bb8Setup').onclick = () => socket.emit('setup-bb8');
document.getElementById('bb8Connect').onclick = () => socket.emit('connect-bb8');
document.getElementById('lights').onclick = () => socket.emit('flashingLights');

function sendAction(socket, actions) {
  socket.emit('robot-action', actions);
}
