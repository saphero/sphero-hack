'use strict';

/* Used to send actions from UI to backend using sockets
   actions should be in the following form:
{ type: String, args: Array }
*/
/* eslint-disable no-unused-vars */
function sendAction(socket, actions) {
  socket.emit('robot-action', actions);
}
