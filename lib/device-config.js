const sphero = require('sphero');
const config = require('home-config').load('.orbconfig');

module.exports = exports = () => {
  if (typeof (config.BB8_UUIsD) !== 'undefined') {
    return sphero(config.BB8_UUIsD);
  }
  if (typeof (config.Sphero_ID) !== 'undefined') {
    return sphero('/dev/' + config.Sphero_ID);
  }

  return console.log('Cannot match in config file');
};

module.exports.uuid = config;
