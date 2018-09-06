const db = require('../connection')


var User = db.bookshelf.Model.extend({
    tablename: 'users',
    hasTimeStamps: true,
    // verifyPassword: function(password) {
    //     return this.get('password') === password;
    // },
    // byEmail: function(email) {
    //     return this.forge().query({where:{ email: email }}).fetch();
    // }
    plan: function() {
        return this.hasMany(Plan);
    },
    item: function() {
        return this.hasOne(Item);
    }

})
var Plan = db.bookshelf.Model.extend({
    tableName: 'plans',
    user: function() {
      return this.belongsTo(User);
    }
  });

var Item = db.bookshelf.Model.extend({
    tableName: 'items',
    user: function() {
      return this.belongsTo(User);
    }
});
  
var Users = db.bookshelf.Collection.extend({  
    model: User
});

var getUserFromDB = (username) => {
    db.knex('users').where({username: username}).fetch()
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getUserFromDB ", err);
    })
}

var createUserInDB = (username, fullName, password, email, retireAge, retireGoal, currentAge, currentSavings, monthlySavings, monthlySpending) => {
    new User({ username: username }).fetch().then(function(found, err) {
        if(!found){
            db.knex('users').insert({username: username}, {fullName: fullName}, {password: password}, {email: email}, {retireAge: retireAge}, {retireGoal: retireGoal}, {currentAge: currentAge}, {currentSavings: currentSavings}, {monthlySavings: monthlySavings}, {monthlySpending: monthlySpending})
            .then(newUser => {
                console.log(newUser, " was created in the database model.")
            })
            .catch(err => {
                console.log("this error occurred in createUserInDB ", err);
            })
        }
    })
}

var updateUserInDB = (update) => {
}

var userLoginDB = (req, res) => {

}

module.exports = {User, Users, getUserFromDB, createUserInDB, updateUserInDB, userLoginDB}