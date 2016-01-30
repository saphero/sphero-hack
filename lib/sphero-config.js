const sphero = require('sphero');
const config = require('home-config').load('.spheroconfig');

module.exports = exports = () => {
  if (typeof (config.Sphero_ID) !== 'undefined') {
    return sphero('/dev/' + config.Sphero_ID);
  }
  return false;
};

module.exports.spheroInfo = config;
