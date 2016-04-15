'use strict';

module.exports = exports = (port, openBrowser) => {
  const express = require('express');
  const app = express();
  const socketListeners = require(__dirname + '/socket-listeners');
  const opn = require('opn');

  app.use('/', express.static(__dirname + '/../build'));
  app.use('/static', express.static(__dirname + '/../public'));
  app.use('/static', express.static(__dirname + '/../build'));

  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  // Creates all socket.io event listeners
  var orb;
  socketListeners(io, orb);

  var serverInst = server.listen(port, () => {
    console.log('server running on port ' + port);
  });

  if (openBrowser) opn('http://localhost:' + port);

  return serverInst;
};
