const router = require('express').Router();
const usersController = require('./controllers/controller.js');
const plaidController = require('./controllers/plaid.js');

// routes all requests from the client to the controller.js

// handles users data such as username, password, email
router.get('/users', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users', usersController.updateUser);

// handles user inputs such as retirement age, income, savings
router.get('/plans', usersController.getPlans);
router.post('/plans', usersController.createPlan);
router.delete('/plans', usersController.deletePlan);
router.put('/plans', usersController.updatePlan);

// handles user plaid data
router.get('/items', usersController.getItems);
router.post('/items', usersController.createItem);
router.put('/items', usersController.updateItem);

// handles user optional inputs such as number of kids, familysize
router.get('/goals', usersController.getGoals);
router.post('/goals', usersController.createGoal);
router.put('/goals', usersController.updateGoal);

// handles user plaid account links
router.post('/get_access_token', plaidController.getAccessToken);
router.get('/accounts', plaidController.getAccounts);
router.put('/history', plaidController.updateHistory);

// handles retirement calculation
router.get('/trajectory', usersController.calculateRetirePlan);

//seeds savings history database
router.post('/seedHistory', plaidController.seedHistory);
module.exports = router;
