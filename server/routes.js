const router = require('express').Router();
const usersController = require('./controllers/controller.js');

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

router.post('/login', usersController.userLogin);

module.exports = router;