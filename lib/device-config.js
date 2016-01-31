const sphero = require('sphero');
var config;

//using jQuery for click event
module.exports = exports = () => {
  if $('#spheroConnect').on('click', function() {
    config = require('home-config').load('.spheroconfig');
    console.log('hello');
    return sphero('/dev/' + config.Sphero_ID);
  });

  if $('#bb8Connect').on('click', function() {
    config = require('home-config').load('.bb8config');
    return sphero(config.BB8_UUIsD);
  });

  return console.log('Cannot find match in config file');
};
