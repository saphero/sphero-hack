'use strict';

/* eslint-disable no-unused-expressions
*/

const expect = require('chai').expect;
const socketListeners = require(__dirname + '/../lib/socket-listeners');
require(__dirname + '/../lib/server');

describe('socket listener tests', () => {

  before(() => {
    const express = require('express');
    const app = express();
    this.server = require('http').Server(app);
    this.io = require('socket.io')(this.server);

    this.server.listen(5000, () => {
      console.log('server running on port 5000');
    });

    this.testOrb = {
      roll: (speed) => {
        expect(speed).to.exist;
        this.called++;
      },
      randomColor: () => {
        this.called++;
      },
      setHeading: (degrees, cb) => {
        expect(degrees).to.exist;
        this.called++;
        cb();
      },
      color: () => { },
      streamVelocity: () => { },
      streamAccelerometer: () => { },
      on: () => { }
    };
    socketListeners(this.io, this.testOrb);
  });

  beforeEach((done) => {
    // Creates all socket.io event listeners
    this.called = 0;
    this.socket = require('socket.io-client')('http://localhost:5000');
    this.socket.on('connect', () => done());
  });

  it('rollDirection should work', (done) => {
    socketListeners.rollDirection(this.testOrb, false, 0, { emit() {} }, () => {
      expect(this.called).to.eql(2);
      expect(this.testOrb).to.exist;
      done();
    });
  });

  it('roll left events should work', (done) => {
    this.socket.emit('roll', { direction: 'left', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.called).to.eql(3);
      done();
    });
  });

  it('roll right events should work', (done) => {
    this.socket.emit('roll', { direction: 'right', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.called).to.eql(3);
      done();
    });
  });

  it('roll down events should work', (done) => {
    this.socket.emit('roll', { direction: 'down', resetHeading: true });
    this.socket.on('rolled', () => {
      expect(this.called).to.eql(3);
      done();
    });
  });

  it('roll up events should work', (done) => {
    this.socket.emit('roll', { direction: 'up' });
    this.socket.on('rolled', () => {
      expect(this.called).to.eql(2);
      done();
    });
  });

  it('speed increase should work', (done) => {
    this.socket.emit('speed', 'up');
    this.socket.on('speed-change', () => {
      expect(this.called).to.eql(1);
      done();
    });
  });

  it('speed decrease should work', (done) => {
    this.socket.emit('speed', 'down');
    this.socket.on('speed-change', () => {
      expect(this.called).to.eql(1);
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
    const currPreset = 'move-random';
    this.socket.emit('preset', { name: currPreset, test: true });
    this.socket.on('preset-executed', (command) => {
      if (command === currPreset) done();
    });
  });

  afterEach(() => {
    this.socket.destroy();
  });

  after(() => {
    this.server.close();
  });
});
