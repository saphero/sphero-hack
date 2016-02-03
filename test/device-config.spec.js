'use strict';

const expect = require('chai').expect;
const deviceConfig = require(__dirname + '/../lib/device-config');
const homeConfig = require('home-config');

describe('device-config', () => {
  before(() => {
    this.oldConfig = homeConfig.load('.spheroconfig');
    this.newConfig = homeConfig.load('.spheroconfig');
    this.newConfig.SPHERO_ID = 'tty.Sphero-GWW-AMP-SPP';
    this.newConfig.save();
  });

  it('should export create a sphero object with given ID', () => {
    const testSphero = deviceConfig.spheroCreate();
    expect(testSphero.constructor.name).to.eql('Sphero');
    expect(testSphero.connection.conn).to.eql('/dev/tty.Sphero-GWW-AMP-SPP');
  });

  after(() => {
    this.oldConfig.save();
  });
});
