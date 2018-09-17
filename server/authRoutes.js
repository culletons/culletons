const authRouter = require('express').Router();
const usersController = require('./controllers/controller.js');

authRouter.post('/login', usersController.userLogin);

module.exports = authRouter;