'use strict';

const express = require('express');
const app = express()();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connect-sphero', () => {
    // call to connect to sphero
  });
  socket.on('connect-bb8', () => {
    // call to connect to bb8
  });
  socket.on('robot-action', () => {
    // Send generic command to sphero
    // orb[opts.type].apply(orb, [...opts.args,
    //   () => event.sender.send('performed action: ' + opts.type)]);
  });
});

app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
  res.render('index.jade');
});
server.listen(3000, () => console.log('Server running on port 3000'));
