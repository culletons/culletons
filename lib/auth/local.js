const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../../server/db/connection')
const init = require('./passport');

init()

passport.use(new LocalStrategy(function(username, password, done) {
  knex.select('username').from('users')
  .where({username : username})
  .then((user) => {
    if (!user) {
      return done(null, false, { message : 'No such user.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password' });
    } else {
      return done(null, user);
    }
  })
  // .asCallback(function(err, user) {
  //   if (err) {console.log(err)}
  //   if (!user) {
  //     return done(null, false, { message: 'No such user.'})
  //   }
  //   if (user.password !== password) {
  //     return done(null, false, { message: 'Incorrect password.'})
  //   }
  //   return done(null, user)
  // })
}))

module.exports = passport