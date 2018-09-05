
module.exports = {

  getUser: (req, res) => {
    res.sendStatus(500);
  },

  createUser: (req, res) => {
    res.sendStatus(500);
  },

  updateUser: (req, res) => {
    res.sendStatus(500);
  },

  userLogin: (req, res) => {
    res.status(201).send(req.user)
  }
}
