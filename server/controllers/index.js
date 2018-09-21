
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/../../client/dist')));
app.use(express.static(path.join(__dirname, '/../../node_modules')));

const routes = require('../routes.js');

app.use(bodyParser.json())
app.use('/retire', routes);

var port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Example app listening on port ${port}!`));