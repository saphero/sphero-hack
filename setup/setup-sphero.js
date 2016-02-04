'use strict';

const fs = require('fs');

module.exports = exports = (cb) => {
  console.log('Beginning setup');
  const spheroFile = 'tty.Sphero';
  fs.readdir('/dev', (err, files) => {
    if (err) return console.log(err);
    var matchy = files.filter(file => file.indexOf(spheroFile) === 0);
    const config = require('home-config').load('.spheroconfig', {
      SPHERO_ID: matchy[0]
    });
    config.save();
    console.log('Info saved to ~/.spheroconfig');
    cb();
  });
};
