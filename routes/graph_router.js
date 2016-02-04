'use strict';

const express = require('express');
const Graph = module.exports = express.Router();

Graph.get('/move', (req, res) => {
  // bring in module.exported functions which make http.requests from sphero
  // commands on server side to client side jQuery rendering Flot graphs
});
