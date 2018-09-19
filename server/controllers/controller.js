const model = require('../db/models/model.js');
var admin = require('firebase-admin');

var serviceAccount = require('../config.js').FIREBASE_credential;
var database = require('../config.js').FIREBASE_databaseURL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: database
});

module.exports = {
  // looks into the database if the user is saved into our database
  getUser: (req, res) => {
    let idToken = req.query.idToken;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        var uid = decodedToken.uid;
        model
          .getUserByOAuthFromDB(uid)
          .then((user) => {
            if (user) {
              // if user is in the database send the user information to client
              res.status(200).send(user);
            } else {
              setTimeout(() => {
                // else return error
                console.log('user not found in DB');
                res.sendStatus(500);
              }, 2000);
            }
          })
          .catch((err) => {
            console.log('user not found in DB');
            res.sendStatus(500);
          });
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
  },

  // creates user upon signup
  createUser: (req, res) => {
    let idToken = req.body.idToken;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        var uid = decodedToken.uid;
        model
          .getUserByOAuthFromDB(uid)
          .then((user) => {
            // if the user already exists in our database, throw error
            if (user) {
              console.log('USER ALREADY EXISTS IN DB');
              res.sendStatus(500);
            } else {
              // else create the user account in our database
              model
                .createUserInDBByOAuth(uid, req.body.fullname, req.body.email, req.body.username)
                .then((user) => {
                  // console.log(user, 'this user was created in the database');
                  res.status(200).send(user);
                })
                .catch((err) => {
                  console.log('this error occurred in createUser in DB ', err);
                  res.sendStatus(500);
                });
            }
          })
          .catch((err) => {
            console.log('user could not be looked up in DB' + err);
            res.sendStatus(500);
          });
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
  },

  // NOT IMPLEMENTED YET: if user wanted to change their username, password, or email
  updateUser: (req, res) => {
    // console.log('req', req);
    res.sendStatus(500);
  },

  // retrieves user inputs for retirement plan for specific user.
  getPlans: (req, res) => {
    model
      .getPlansFromDB(req.query.userId)
      .then((plan) => {
        res.status(200).send(plan);
      })
      .catch((err) => {
        console.log('this error occurred in getPlan ', err);
        res.sendStatus(500);
      });
  },

  // deletes user inputs for retirement plan for specific user.
  deletePlan: (req, res) => {
    model.deletePlan(req.query.planId);
    res.sendStatus(202);
  },

  // creates user inputs for retirement plan for specific user.
  createPlan: (req, res) => {
    model
      .createPlanInDB(
        req.body.name,
        req.body.userId,
        req.body.retireAge,
        req.body.retireGoal,
        req.body.currentAge,
        req.body.annualIncome,
        req.body.currentSavings,
        req.body.monthlySavings,
        req.body.monthlySpending
      )
      .then((plan) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('this error occurred in createPlan ', err);
        res.sendStatus(500);
      });
  },

  // updates existing plans that user already have created.
  updatePlan: (req, res) => {
    model.updatePlan(req.body.name, req.body.planId);
    res.sendStatus(204);
  },

  // retrieves plaid information from the database for specific user.
  getItems: (req, res) => {
    // console.log('this is req.query in getItem ', req.query);
    model
      .getItemsFromDB(req.query.userId)
      .then((item) => {
        // console.log('this is returned from getItem ', item);
        res.status(200).send(item);
      })
      .catch((err) => {
        console.log('this error occurred in getItem ', err);
        res.sendStatus(500);
      });
  },

  // creates user's plaid information into the database.
  createItem: (req, res) => {
    // console.log('this is req.body in createItem ', req.body);
    model
      .createItemInDB(
        req.body.userId,
        req.body.item,
        req.body.itemToken,
        req.body.institutionName,
        req.body.institutionId,
        req.body.linkSessionId
      )
      .then((item) => {
        // console.log(item, 'this item was created in the database controller.');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('this error occurred in createItem ', err);
        res.sendStatus(500);
      });
  },

  // NOT IMPLEMENTED: if the user wanted to update on their plaid account
  updateItem: (req, res) => {
    res.sendStatus(500);
  },

  // retrieves user's optional data inputs from the database
  getGoals: (req, res) => {
    model
      .getGoalsFromDB(req.query.userId)
      .then((goal) => {
        // console.log('this is returned from getGoals ', goal);
        res.send(goal);
      })
      .catch((err) => {
        console.log('this error occured in getGoals ', err);
        res.sendStatus(500);
      });
  },

  // creates user's optional data inputs to the database
  createGoal: (req, res) => {
    model
      .createGoalInDB(
        req.body.userId,
        req.body.familySize,
        req.body.numberOfKids,
        req.body.travel,
        req.body.hobbySpending,
        req.body.luxurySpending
      )
      .then((goal) => {
        // console.log(goal, 'this goal was created in the database controller');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('this error occured in createGoal ', err);
        res.sendStatus(500);
      });
  },

  // NOT IMPLEMENTED: if user wanted to change their optional inputs, change the database with the changed input
  updateGoal: (req, res) => {
    res.sendStatus(500);
  },

  // computes retirement savings and trajectory
  calculateRetirePlan: (req, res) => {
    var retireLifestyles = {
      1: 0.6,
      2: 0.8,
      3: 1.0,
      4: 1.2,
      5: 1.4
    };
    let goals = null;
    if (req.query.goals) {
      goals = JSON.parse(req.query.goals);
      console.log(goals);
    }
    let retirePlanToSave = {};
    let activePlan = JSON.parse(req.query.activePlan);
    let projectedSalary = [];
    let projectedSpending = [];
    let projectedSavings = [];
    let retireSavingsHighReturns = [];
    let retireSavingsLowReturns = [];
    let retireSavingsMidReturns = [];
    if (activePlan) {
      let savingsHigh = activePlan.currentSavings;
      let savingsLow = activePlan.currentSavings;
      let savingsMid = activePlan.currentSavings;
      let spending = activePlan.monthlySpending * 12;
      let age = activePlan.currentAge;
      let spendingPercent = activePlan.monthlySpending / (activePlan.annualIncome / 12);
      let savingPercent = activePlan.monthlySavings / (activePlan.annualIncome / 12);
      let retirementSpending = 0;
      while (age < 105) {
        if (age < activePlan.retirementAge) {
          var salary = Math.floor(
            activePlan.annualIncome * (1 + 0.02 * (age - activePlan.currentAge))
          ); // projected salary for a given age
          projectedSalary.push(salary);
          // factor child expenses
          if (goals && goals.numberOfKids > 0 && (age > 30 && age < 49)) {
            let childCost = 28000;
            for (let i = 1; i < goals.numberOfKids; i++) {
              childCost = childCost + 28000 * (1 - 0.2 * i);
            }
            spending = Math.floor(salary * spendingPercent) + childCost;
            projectedSpending.push(spending);
            var savings = Math.floor(salary * savingPercent) - childCost; // projected yearly savings
            projectedSavings.push(savings);
          } else {
            spending = Math.floor(salary * spendingPercent); // projected spending based on salary and spend %.  (Adjust for the GOALS set in future work)
            projectedSpending.push(spending);
            var savings = Math.floor(salary * savingPercent); // projected yearly savings
            projectedSavings.push(savings);
          }
          // console.log(goals);
          savingsHigh = Math.floor(savingsHigh * 1.1) + savings; // Savings calculator based on very high market return
          savingsLow = Math.floor(savingsLow * 1.04) + savings; // Savings calculator based on low market return
          savingsMid = Math.floor(savingsMid * 1.07) + savings; // Savings calculator based on mid market return
          retireSavingsHighReturns.push(savingsHigh);
          retireSavingsLowReturns.push(savingsLow);
          retireSavingsMidReturns.push(savingsMid);
          age++;
        } else {
          if (age === activePlan.retirementAge) {
            retirementSpending = Math.floor(spending * retireLifestyles[activePlan.retireGoal]); // projected spending final spending while working * retire lifestyle multiplier.
            retirePlanToSave.savingsAtRetirement = savingsMid;
            retirePlanToSave.salaryAtRetirement = salary;
            retirePlanToSave.spendingAtRetirement = retirementSpending;
            retirePlanToSave.savingsRate = Math.floor(savingPercent * 100);
          }
          projectedSalary.push(0);
          projectedSavings.push(0);
          projectedSpending.push(retirementSpending);
          savingsHigh =
            Math.floor(savingsHigh * 1.03) -
            retirementSpending * (1 + 0.02 * (age - activePlan.retirementAge));
          if (savingsHigh >= 0) {
            retireSavingsHighReturns.push(savingsHigh);
          } else {
            retireSavingsHighReturns.push(0);
          }
          savingsLow =
            Math.floor(savingsLow * 1.03) -
            retirementSpending * (1 + 0.02 * (age - activePlan.retirementAge));
          if (savingsLow >= 0) {
            retireSavingsLowReturns.push(savingsLow);
          } else {
            retireSavingsLowReturns.push(0);
          }
          savingsMid =
            Math.floor(savingsMid * 1.03) -
            retirementSpending * (1 + 0.02 * (age - activePlan.retirementAge));
          if (savingsMid >= 0) {
            retireSavingsMidReturns.push(savingsMid);
          } else {
            retireSavingsMidReturns.push(0);
          }
          age++;
        }
      }
    }
    retirePlanToSave.projectedSalary = projectedSalary;
    retirePlanToSave.projectedSpending = projectedSpending;
    retirePlanToSave.projectedSavings = projectedSavings;
    retirePlanToSave.retireSavingsHighReturns = retireSavingsHighReturns;
    retirePlanToSave.retireSavingsLowReturns = retireSavingsLowReturns;
    retirePlanToSave.retireSavingsMidReturns = retireSavingsMidReturns;
    res.send(retirePlanToSave);
  }
};
