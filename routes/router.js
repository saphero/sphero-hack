'use strict';

const express = require('express');
const Router = module.exports = express.Router();

Router.get('/', (req, res) => {
  res.render('index');
});

Router.get('/about', (req, res) => {
  res.render('about');
});

Router.get('/color', (req, res) => {
  res.render('color');
});

Router.get('/move', (req, res) => {
  res.render('move');
});
