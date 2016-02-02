const express = require('express');
const Router = module.exports = express.Router();
const app = express();

Router.get('/', (req, res) => {
  res.render('index');
});

Router.get('/about', (req, res) => {
  res.render('about');
});

Router.get('/color', (req, res) => {
  res.render('color');
});
