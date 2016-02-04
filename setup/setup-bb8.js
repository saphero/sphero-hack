const noble = require('noble');
const _ = require('lodash');

module.exports = exports = (callback) => {
  console.log('beginning setup');
  noble.startScanning();
  noble.on('discover', (peripheral) => {
    if (_.includes(peripheral.advertisement.localName, 'BB-')) {
      var deviceUUID = peripheral.uuid;
      var localName = peripheral.advertisement.localName;
      console.log('writing to config file');
      console.log('BB8 UUID - "' + deviceUUID + '"');
      console.log('BB8_LOCAL_NAME: ' + localName);
      var config = require('home-config').load('.bb8config', {
        BB8_UUID: deviceUUID,
        BB8_LOCAL_NAME: localName
      });
      config.save();
      noble.stopScanning();
      console.log('connected to ' + config.BB8_LOCAL_NAME);
      console.log('saved config file to ~/.bb8config');
      callback();
    } else {
      console.log('searching...');
    }
  });
};
