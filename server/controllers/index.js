const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/../../client/dist')));
app.use(express.static(path.join(__dirname, '/../../node_modules')));

const routes = require('../routes.js');
const authRoutes = require('../authRoutes.js')

app.use(bodyParser.json())
app.use('/retire', routes);
app.use('/auth', authRoutes)
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session())

var port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Example app listening on port ${port}!`));