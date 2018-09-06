const router = require('express').Router();
const usersController = require('./controllers/controller.js');
const plaidController = require('./controllers/plaid.js');

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);


router.post('/get_access_token', plaidController.getAccessToken);

module.exports = router;
