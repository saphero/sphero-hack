'use strict';

const expect = require('chai').expect;
const deviceConfig = require(__dirname + '/../lib/device-config');
const homeConfig = require('home-config');

describe('device-config', () => {
  describe('sphero', () => {
    before(() => {
      this.oldConfig = homeConfig.load('.spheroconfig');
      this.newConfig = homeConfig.load('.spheroconfig');
      this.newConfig.SPHERO_ID = 'tty.Sphero-GWW-AMP-SPP';
      this.newConfig.save();
    });

    it('should create a sphero object with given ID', () => {
      const testSphero = deviceConfig.spheroCreate();
      expect(testSphero.constructor.name).to.eql('Sphero');
      expect(testSphero.connection.conn).to.eql('/dev/tty.Sphero-GWW-AMP-SPP');
    });

    after(() => {
      this.oldConfig.save();
    });
  });
  describe('bb8 success', () => {
    before(() => {
      this.oldConfig = homeConfig.load('.bb8config');
      this.newConfig = homeConfig.load('.bb8config');
      this.newConfig.BB8_UUID = '944f561f8cf441f3b5405ed48f5c63cf';
      this.newConfig.save();
    });

    it('should create a sphero object with given ID', () => {
      const testBB8 = deviceConfig.bb8Create();
      expect(testBB8.constructor.name).to.eql('Sphero');
      expect(testBB8.connection.uuid)
        .to.eql('944f561f8cf441f3b5405ed48f5c63cf');
    });

    after(() => {
      this.oldConfig.save();
    });
  });
  describe('bb8 fail', () => {
    before(() => {
      this.oldConfig = homeConfig.load('.bb8config');
      this.newConfig = homeConfig.load('.bb8config');
      if (typeof this.newConfig.BB8_UUID !== 'undefined') {
        delete this.newConfig.BB8_UUID;
      }
      this.newConfig.save();
    });

    it('should create a sphero object with given ID', () => {
      const testBB8 = deviceConfig.bb8Create();
      expect(testBB8).to.eql(false);
    });

    after(() => {
      this.oldConfig.save();
    });
  });
});
