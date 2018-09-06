const authRouter = require('express').Router();
const usersController = require('./controllers/controller.js');
const passport = require ('passport')

authRouter.post('/login', usersController.userLogin);

// passport.authenticate('local')

module.exports = authRouter;