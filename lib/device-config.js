'use strict';

const sphero = require('sphero');

exports.spheroConnect = () => {
  const config = require('home-config').load('.spheroconfig');
  return sphero('/dev/' + config.Sphero_ID);
};

exports.bb8Connect = () => {
  const config = require('home-config').load('.bb8config');
  return sphero(config.BB8_UUIsD);
};
