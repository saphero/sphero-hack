'use strict';

/* eslint-disable no-unused-expressions
*/

const expect = require('chai').expect;
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');
const dance = require(__dirname + '/../commands/dance');
const fly = require(__dirname + '/../commands/fly');
const magic8 = require(__dirname + '/../commands/magic8');
const collision = require(__dirname + '/../commands/collision');
const accelerometer = require(__dirname + '/../commands/accelerometer');
const speedometer = require(__dirname + '/../commands/speedometer');

describe('sphero commands', () => {
  it('lights.rainbow should send color commands', (done) => {
    const testInterval = lights.rainbow(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(1);
      clearInterval(testInterval);
      done();
    }, 250);
  });

  it('lights.disco should send multiple commands', (done) => {
    const testInterval = lights.disco(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(2);
      clearInterval(testInterval);
      done();
    }, 550);
  });

  it('look should send roll commands', (done) => {
    const testInterval = look(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(2);
      clearInterval(testInterval);
      done();
    }, 500);
  });

  it('move-random should send roll commands', (done) => {
    const testInterval = moveRandom(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(2);
      clearInterval(testInterval);
      done();
    }, 1000);
  });

  it('dance should send color and roll commands', (done) => {
    const testInterval = dance(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(2);
      clearInterval(testInterval);
      done();
    }, 100);
  });

  it('fly should turn on freefall events', () => {
    fly(this.testOrb);
    expect(this.called).to.eql(3);
  });

  it('magic 8 should change colors and start listening', () => {
    magic8(this.testOrb);
    expect(this.called).to.eql(2);
  });

  it('collision should change colors, start listening, and roll', () => {
    collision(this.testOrb);
    expect(this.called).to.eql(4);
  });

  it('should turn on accelerometer', () => {
    accelerometer(this.testOrb);
    expect(this.called).to.eql(2);
  });

  it('should turn on speedometer', () => {
    speedometer(this.testOrb);
    expect(this.called).to.eql(2);
  });

  beforeEach(() => {
    this.called = 0;
    this.testOrb = {
      roll: () => this.called++,
      color: (color) => {
        expect(color).to.exist;
        this.called++;
      },
      streamVelocity: () => this.called++,
      streamAccelerometer: () => this.called++,
      randomColor: () => this.called++,
      detectFreefall: () => this.called++,
      detectCollisions: () => this.called++,
      on: (event, cb) => {
        expect(event).to.be.a('string');
        expect(cb).to.be.a('function');
        this.called++;
      }
    };
  });
});
