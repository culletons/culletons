const model = require('../db/models/model.js');
var admin = require('firebase-admin');

var serviceAccount = require('../config.js').FIREBASE_credential;
var database = require('../config.js').FIREBASE_databaseURL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: database
});

module.exports = {

  getUser: (req, res) => {
    let idToken = req.query.idToken;
    admin.auth().verifyIdToken(idToken)
          .then((decodedToken) => {
            var uid = decodedToken.uid;
            model.getUserByOAuthFromDB(uid)
                  .then(user => {
                    if (user) {
                      res.status(200).send(user)
                    } else {
                      setTimeout(() => {
                        console.log('user not found in DB');
                        res.sendStatus(500);
                        // FIND A WAY TO END THE SESSION!!
                      }, 2000);
                    }
                  })
                  .catch(err => {
                    console.log('user not found in DB');
                    res.sendStatus(500);
                  })
          }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
          });
  },

  createUser: (req, res) => {
    let idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
          .then((decodedToken) => {
            var uid = decodedToken.uid;
            model.getUserByOAuthFromDB(uid)
                  .then(user => {
                    if (user) {
                      console.log('USER ALREADY EXISTS IN DB');
                      res.sendStatus(500);
                    } else {
                      model.createUserInDBByOAuth(uid, req.body.fullname, req.body.email, req.body.username)
                            .then(user => {
                              console.log(user, "this user was created in the database");
                              res.status(200).send(user);
                            })
                            .catch(err => {
                              console.log("this error occurred in createUser in DB ", err)
                              res.sendStatus(500);
                            })
                    }
                  })
                  .catch(err => {
                    console.log('user could not be looked up in DB' + err);
                    res.sendStatus(500);
                  })
          }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
          });
  },

  updateUser: (req, res) => {
    res.sendStatus(500);
  },

  userLogin: (req, res) => {
    res.status(201).send(req.user)
  },

  getPlans: (req, res) => {
    model.getPlansFromDB(req.query.userId)
    .then(plan => {
      res.status(200).send(plan);
    })
    .catch(err => {
      console.log("this error occurred in getPlan ", err)
      res.sendStatus(500);
    })
  },

  createPlan: (req, res) => {
    model.createPlanInDB(req.body.userId, req.body.retireAge, req.body.retireGoal, req.body.currentAge, req.body.currentSavings, req.body.monthlySavings, req.body.monthlySpending)
    .then(plan => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("this error occurred in createPlan ", err)
      res.sendStatus(500);
    })
  },

  updatePlan: (req, res) => {
    res.sendStatus(500);
  },

  getItems: (req, res) => {
    console.log("this is req.query in getItem ", req.query)
    model.getItemsFromDB(req.query.userId)
    .then(item => {
      console.log("this is returned from getItem ", item)
      res.status(200).send(item);
    })
    .catch(err => {
      console.log("this error occurred in getItem ", err)
      res.sendStatus(500);
    })
  },

  createItem: (req, res) => {
    console.log("this is req.body in createItem ", req.body)
    model.createItemInDB(req.body.userId, req.body.item, req.body.itemToken, req.body.institutionName, req.body.institutionId, req.body.linkSessionId)
    .then(item => {
      console.log(item, "this item was created in the database controller.")
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("this error occurred in createItem ", err)
      res.sendStatus(500);
    })
  },

  updateItem: (req, res) => {
    res.sendStatus(500);
  },
}
