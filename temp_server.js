const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
  res.render('index.jade');
}).listen(3000, () => console.log('Server running on port 3000'));
