'use strict';

const sphero = require('sphero');

exports.spheroCreate = () => {
  const config = require('home-config').load('.spheroconfig');
  return sphero('/dev/' + config.SPHERO_ID);
};

exports.bb8Create = () => {
  const config = require('home-config').load('.bb8config');
  if (typeof config.BB8_UUID !== 'undefined') {
    console.log('Connect run');
    return sphero(config.BB8_UUID);
  }
  console.log('Fail in uuid config');
  return false;
};
