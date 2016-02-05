#! /usr/bin/env node

'use strict';

const createAppServer = require(__dirname + '/../server.js');

createAppServer(3000, true);
