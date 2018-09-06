const router = require('express').Router();
const usersController = require('./controllers/controller.js');
const passport = require ('passport');
const plaidController = require('./controllers/plaid.js');

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

router.post('/login', passport.authenticate('local'), usersController.userLogin);

router.post('/get_access_token', plaidController.getAccessToken);

module.exports = router;
