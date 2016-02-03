const noble = require('noble');
const _ = require('lodash');

module.exports = exports = (callback) => {
  console.log('Beginning setup');
  noble.startScanning();

  noble.on('discover', (peripheral) => {
    if (_.includes(peripheral.advertisement.localName, 'BB-')) {
      var deviceUUID = peripheral.uuid;
      var localName = peripheral.advertisement.localName;
      console.log('BB-8 UUID - "' + deviceUUID + '" found');
      console.log('Local Name: ' + localName);
      var config = require('home-config').load('.bb8config', {
        BB8_UUID: deviceUUID,
        BB8_LOCAL_NAME: localName
      });
      config.save();
      console.log('Connected to ' + config.BB8_LOCAL_NAME);
      console.log('Info saved to ~/.bb8config');
      noble.stopScanning();
      console.log('Scanning stopped');
      callback();
    } else {
      console.log('Searching...');
    }
  });
};
