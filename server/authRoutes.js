const authRouter = require('express').Router();
const usersController = require('./controllers/user.js');

authRouter.post('/login', usersController.userLogin);

module.exports = authRouter;