'use strict';

const expect = require('chai').expect;
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');
const gyroscope = require(__dirname + '/../commands/gyroscope');
const accelerometer = require(__dirname + '/../commands/accelerometer');
const dance = require(__dirname + '/../commands/dance');

describe('sphero commands', () => {
  it('lights.rainbow should send color commands', (done) => {
    const testInterval = lights.rainbow(this.testOrb);
    setTimeout(() => {
      expect(this.called).to.eql(1);
      clearInterval(testInterval);
      done();
    }, 500);
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
    }, 500);
  });

  it('should turn on gyroscope', () => {
    gyroscope(this.testOrb);
    expect(this.called).to.eql(2);
  });

  it('should turn on accelerometer', () => {
    accelerometer(this.testOrb);
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
      randomColor: () => this.called++,
      streamGyroscope: () => this.called++,
      streamAccelerometer: () => this.called++,
      on: (event, cb) => {
        expect(event).to.be.a('string');
        expect(cb).to.be.a('function');
        this.called++;
      }
    };
  });
});
