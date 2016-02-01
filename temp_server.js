'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const setupSocketListeners = require(__dirname + '/lib/setup-socket-listeners');

server.listen(3000, () => console.log('Server running on port 3000'));

app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.jade');
});

// Creates all socket.io event listeners
setupSocketListeners(io);
