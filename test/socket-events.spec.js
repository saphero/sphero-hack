'use strict';

/* eslint-disable no-unused-expressions
*/

const expect = require('chai').expect;
const socketListeners = require(__dirname + '/../lib/socket-listeners');
require(__dirname + '/../server');

describe('socket listener tests', () => {

  before(() => {
    const express = require('express');
    const app = express();
    this.server = require('http').Server(app);
    this.io = require('socket.io')(this.server);

    this.server.listen(5000, () => {
      console.log('server running on port 5000');
    });

    this.orb = {
      roll: (speed) => {
        expect(speed).to.exist;
        this.counter++;
      },
      randomColor: () => {
        this.counter++;
      },
      setHeading: (degrees, cb) => {
        expect(degrees).to.exist;
        this.counter++;
        cb();
      },
      color: () => { },
      streamVelocity: () => { },
      streamAccelerometer: () => { },
      on: () => { }
    };
    socketListeners(this.io, this.orb);
  });

  beforeEach((done) => {
    // Creates all socket.io event listeners
    this.counter = 0;
    this.socket = require('socket.io-client')('http://localhost:5000');
    this.socket.on('connect', () => done());
  });

  it('rollDirection should work', (done) => {
    socketListeners.rollDirection(this.orb, false, 0, { emit() {} }, () => {
      expect(this.counter).to.eql(2);
      expect(this.orb).to.exist;
      done();
    });
  });

  it('roll left events should work', (done) => {
    this.socket.emit('roll', { direction: 'left', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.counter).to.eql(3);
      done();
    });
  });

  it('roll right events should work', (done) => {
    this.socket.emit('roll', { direction: 'right', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.counter).to.eql(3);
      done();
    });
  });

  it('roll down events should work', (done) => {
    this.socket.emit('roll', { direction: 'down', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.counter).to.eql(3);
      done();
    });
  });

  it('roll up events should work', (done) => {
    this.socket.emit('roll', { direction: 'up' });
    this.socket.on('rolled', () => {
      expect(this.counter).to.eql(2);
      done();
    });
  });

  it('speed increase should work', (done) => {
    this.socket.emit('speed', 'up');
    this.socket.on('speed-change', () => {
      expect(this.counter).to.eql(1);
      done();
    });
  });

  it('speed decrease should work', (done) => {
    this.socket.emit('speed', 'down');
    this.socket.on('speed-change', () => {
      expect(this.counter).to.eql(1);
      done();
    });
  });

  it('xmas preset should send a reply', (done) => {
    const currPreset = 'xmas';
    this.socket.emit('preset', { name: currPreset, test: true });
    this.socket.on('preset-executed', (command) => {
      if (command === currPreset) done();
    });
  });

  it('rainbow preset should send a reply', (done) => {
    const currPreset = 'rainbow';
    this.socket.emit('preset', { name: currPreset, test: true });
    this.socket.on('preset-executed', (command) => {
      if (command === currPreset) done();
    });
  });

  it('look preset should send a reply', (done) => {
    const currPreset = 'look';
    this.socket.emit('preset', { name: currPreset, test: true });
    this.socket.on('preset-executed', (command) => {
      if (command === currPreset) done();
    });
  });

  it('move-random preset should send a reply', (done) => {
    const currPreset = 'random';
    this.socket.emit('preset', { name: currPreset, test: true });
    this.socket.on('preset-executed', (command) => {
      if (command === currPreset) done();
    });
  });

  afterEach(() => {
    this.socket.disconnect();
  });

  after(() => {
    this.server.close();
  });
});
