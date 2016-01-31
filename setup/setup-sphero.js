const sphero = require('sphero');
const fs = require('fs');

function find(key, array) {
  var results = [];
  for (var i = 0; i < array.length; i += 1) {
    if (array[i].indexOf(key) === 0) {
      results.push(array[i]);
    }
  }
  return results;
}

module.exports = exports = () => {
  console.log('Beginning setup');
  const spheroFile = 'tty.Sphero';
  var findFiles = fs.readdirSync('/dev');
  console.log(findFiles);
  var matchedFile = find(spheroFile, findFiles);
  console.log(matchedFile[0]);
  var config = require('home-config').load('.spheroconfig', {
    Sphero_ID: matchedFile[0]
  });
  config.save();
  console.log('Connected to ' + config.Sphero_ID);
  return console.log('Info saved to ~/.spheroconfig');
};
