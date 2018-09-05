const model = require('../model.js')

module.exports = {

  getUser: (req, res) => {
    console.log("this is req.body in getUser ", req.body)
    model.getUserFromDB(req.body.username)
    .then(user => {
      console.log("this is returned from getUser ", user)
      res.sendStatus(200).send(user);
    })
    .catch(err => {
      console.log("this error occurred in getUser ", err)
    })
  },

  createUser: (req, res) => {
    console.log("this is req.body in createUser ", req.body)
    model.createUserInDB(req.body.username, req.body.fullName, req.body.password, req.body.email)
    .then(user => {
      console.log(user, "this user was created in the database controller.")
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("this error occurred in createUser ", err)
    })
  },

  updateUser: (req, res) => {
    res.sendStatus(500);
  },

  userLogin: (req, res) => {
    res.status(201).send(req.user)
  }
}
