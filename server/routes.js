const router = require('express').Router();
const usersController = require('./controllers/controller.js');

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

router.get('/plans', usersController.getPlans)
router.post('/plans', usersController.createPlan);
router.put('/plans', usersController.updatePlan);

router.get('/items', usersController.getItems)
router.post('/items', usersController.createItem);
router.put('/items', usersController.updateItem); //optional?

module.exports = router;