const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

var app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

const routes = require('./routes.js');

app.use(bodyParser.json())
app.use('/retire', routes);


module.exports = app;
