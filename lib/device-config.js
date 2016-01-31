'use strict';

const sphero = require('sphero');
var config;

exports.spheroConnect = () => {
  config = require('home-config').load('.spheroconfig');
  console.log('config: ' + JSON.stringify(config));
  return sphero('/dev/' + config.Sphero_ID);
};

exports.bb8Connect = () => {
  config = require('home-config').load('.bb8config');
  console.log('from config file ' + config.BB8_UUIsD);
  return sphero(config.BB8_UUIsD);
};
