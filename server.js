'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const setupBB8 = require(__dirname + '/setup/setup-bb8');
const setupSphero = require(__dirname + '/setup/setup-sphero');
const connectFn = require(__dirname + '/lib/device-config');
const lights = require(__dirname + '/commands/lights');
const Router = require(__dirname + '/routes/router');
var orb;

server.listen(3000, () => console.log('Server running on port 3000'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/', Router);
app.use('/static', express.static(__dirname + '/public'));

io.on('connection', socket => {
  socket.on('connect-sphero', () => {
    setupSphero();
    orb = connectFn.spheroConnect();
  });
  socket.on('connect-bb8', () => {
    setupBB8();
    orb = connectFn.bb8Connect();
  });
  socket.on('flashingLights', () => {
    lights(orb);
  });
  socket.on('robot-action', () => {

    // Send generic command to sphero
    // orb[opts.type].apply(orb, [...opts.args,
    //   () => event.sender.send('performed action: ' + opts.type)]);
  });
});
