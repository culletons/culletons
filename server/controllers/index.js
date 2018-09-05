const express = require('express');
const parser = require('body-parser');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/../../client/dist')));

const routes = require('../routes.js');

app.use('/retire', routes);

var port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Example app listening on port ${port}!`));