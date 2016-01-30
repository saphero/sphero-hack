const sphero = require('sphero');
const config = require('home-config').load('.bb8config');

module.exports = exports = () => {
  if (typeof (config.BB8_UUID) !== 'undefined') {
    return sphero(config.BB8_UUID);
  }
  return false;
};

module.exports.uuid = config;
