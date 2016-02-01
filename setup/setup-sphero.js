'use strict';

const fs = require('fs');

module.exports = exports = () => {
  console.log('Beginning setup');
  const spheroFile = 'tty.Sphero';
  fs.readdir('/dev', (err, files) => {
    if (err) return console.log(err);
    files.filter(file => file.indexOf(spheroFile === 0));
    /* eslint-disable camelcase */
    const config = require('home-config').load('.spheroconfig', {
      Sphero_ID: files[0]
    });
    /* eslint-enable camelcase */
    config.save();
    return console.log('Info saved to ~/.spheroconfig');
  });
};
