'use strict';

const expect = require('chai').expect;
const lights = require(__dirname + '/../commands/lights');
const look = require(__dirname + '/../commands/look');
const moveRandom = require(__dirname + '/../commands/move-random');

describe('sphero commands', () => {
  it('random lights should send color commands', (done) => {
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

  beforeEach(() => {
    this.called = 0;
    this.testOrb = {
      roll: () => this.called++,
      color: () => this.called++,
      randomColor: () => this.called++
    };
  });

});
