const noble = require('noble');
const _ = require('lodash');

module.exports = exports = () => {
  console.log('Beginning setup');
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      console.log('Starting search');
      noble.startScanning();
    } else {
      console.log('Cannot start search - turn on bluetooth');
    }
  });
  noble.on('discover', (peripheral) => {
    if (_.includes(peripheral.advertisement.localName, 'BB-')) {
      var deviceUUID = peripheral.uuid;
      var localName = peripheral.advertisement.localName;
      console.log('BB-8 UUID - "' + deviceUUID + '" found');
      console.log('Local Name: ' + localName);
      var config = require('home-config').load('.bb8config', {
        BB8_UUIsD: deviceUUID,
        BB8_LOCAL_NAME: localName
      });
      config.save();
      console.log('Connected to ' + config.BB8_LOCAL_NAME);
      console.log('Info saved to ~/.bb8config');
      noble.stopScanning();
      console.log('Scanning stopped');
    } else {
      console.log('Searching...');
    }
  });
};
