const router = require('express').Router();
const usersController = require('./controllers/controller.js');
const plaidController = require('./controllers/plaid.js');

router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

router.get('/plans', usersController.getPlans)
router.post('/plans', usersController.createPlan);
router.delete('/plans', usersController.deletePlan);
router.put('/plans', usersController.updatePlan);

router.get('/items', usersController.getItems)
router.post('/items', usersController.createItem);
router.put('/items', usersController.updateItem); //optional?


router.get('/goals', usersController.getGoals);
router.post('/goals', usersController.createGoal);
router.put('/goals', usersController.updateGoal);

router.post('/get_access_token', plaidController.getAccessToken);
router.get('/accounts', plaidController.getAccounts);
router.put('/history', plaidController.updateHistory);

module.exports = router;
