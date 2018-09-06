const model = require('../db/models/model.js')

module.exports = {

  getUser: (req, res) => {
    console.log("this is req.query in getUser ", req.query)
    if (req.query.oAuthId !== null){
      model.getUserByOAuthFromDB(req.query.oAuthId)
      .then(user => {
        console.log("this is returned from getUser get by OAuth ", user)
        res.status(200).send(user)
      })
      .catch(err => {
        console.log("this error occurred in getUser get by OAuth ", err)
        res.sendStatus(500);
      })
    }
    else {
      model.getUserFromDB(req.query.username, req.query.password)
      .then(user => {
        console.log("this is returned from getUser ", user)
        res.sendStatus(200).send(user);
      })
      .catch(err => {
        console.log("this error occurred in getUser ", err)
        res.sendStatus(500);
      })
    }
  },

  createUser: (req, res) => {
    console.log("this is req.body in createUser ", req.body)
    if (req.body.oAuthId !== null){
      model.createUserInDBByOAuth(req.body.oAuthId, req.body.fullname, req.body.email)
      .then(user => {
        console.log(user, "this user was created in the database controller by OAuth.")
        res.sendStatus(200);
      })
      .catch(err => {
        console.log("this error occurred in createUser create by OAuth ", err)
        res.sendStatus(500);
      })
    }
    else {
      model.createUserInDB(req.body.userId, req.body.username, req.body.fullname, req.body.password, req.body.email)
      .then(user => {
        console.log(user, "this user was created in the database controller.")
        res.sendStatus(200);
      })
      .catch(err => {
        console.log("this error occurred in createUser ", err)
        res.sendStatus(500);
      })
    }
  },

  updateUser: (req, res) => {
    res.sendStatus(500);
  },

  userLogin: (req, res) => {
    res.status(201).send(req.user)
  },

  getPlans: (req, res) => {
    console.log("this is req.query in getPlan ", req.query)
    model.getPlansFromDB(req.query.userId)
    .then(plan => {
      console.log("this is returned from getPlan ", plan)
      res.sendStatus(200).send(plan);
    })
    .catch(err => {
      console.log("this error occurred in getPlan ", err)
      res.sendStatus(500);
    })
  },

  createPlan: (req, res) => {
    console.log("this is req.body in createPlan ", req.body)
    model.createPlanInDB(req.body.userId, req.body.retireAge, req.body.retireGoal, req.body.currentAge, req.body.currentSavings, req.body.monthlySavings, req.body.monthlySpending)
    .then(plan => {
      console.log(plan, "this plan was created in the database controller.")
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
      res.sendStatus(200).send(item);
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
