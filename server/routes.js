const router = require('express').Router();
const usersController = require('./controllers/controller.js');
const passport = require ('passport')

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

router.post('/login', passport.authenticate('local'), usersController.userLogin);

module.exports = router;