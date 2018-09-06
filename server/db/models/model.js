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

var getUserFromDB = (username, password) => {
    new User({username: username, password: password}).fetch()
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getUserFromDB ", err);
    })
}

var getUserByOAuthFromDB = (OAuthToken) => {
    new User({OAuthToken: OAuthToken}).fetch()
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getUserByOAuthFromDB ", err);
    })
}

var createUserInDB = (username, fullName, password, email) => {
    new User({ username: username }).fetch().then(function(found, err) {
        if(!found){
            db.knex('users').insert({username: username}, {fullName: fullName}, {password: password}, {email: email})
            .then(newUser => {
                console.log(newUser, " was created in the database model.")
            })
            .catch(err => {
                console.log("this error occurred in createUserInDB ", err);
            })
        }
    })
}

var createUserInDBByOAuth = (OAuthToken, username, email) => {
    new User({ OAuthToken: OAuthToken }).fetch().then(function(found, err) {
        if(!found){
            db.knex('users').insert({OAuthToken: OAuthToken}, {username: username}, {email: email})
            .then(newUser => {
                console.log(newUser, " was created in the database model.")
            })
            .catch(err => {
                console.log("this error occurred in createUserInDBByOAuth ", err);
            })
        }
    })
}

var updateUserInDB = (update) => {
}

var userLoginDB = (req, res) => {

}

var getPlansFromDB = (userId) => {
    new Plan({userId: userId}).fetch()    
    .then(plan => {
        return plan;
    })
    .catch(err => {
        console.log("this error occurred in getPlansFromDB ", err);
    })
}
var createPlanInDB = (userId, retireAge, retireGoal, currentAge, currentSavings, monthlySavings, monthlySpending) => {
    new Plan({ userId: userId }).fetch().then(function(found, err) {
        if(!found){
            db.knex('plans').insert({userId: userId}, {retireAge: retireAge}, {retireGoal: retireGoal}, {currentAge: currentAge}, {currentSavings: currentSavings}, {monthlySavings: monthlySavings}, {monthlySpending: monthlySpending})
            .then(newPlan => {
                console.log(newPlan, " was created in the database model.")
            })
            .catch(err => {
                console.log("this error occurred in createPlanInDB ", err);
            })
        }
    })
}
var updatePlanInDB = (update) => {
}

var getItemsFromDB = (userId) => {
    new Item({userId: userId}).fetch() 
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getItemsFromDB ", err);
    })
}

var createItemInDB = (userId, item, itemToken, institutionName, institutionId, linkSessionId) => {
    new Item({ userId: userId }).fetch().then(function(found, err) {
        if(!found){
            db.knex('items').insert({userId: userId}, {item: item}, {itemToken: itemToken}, {institutionName: institutionName}, {institutionId: institutionId}, {linkSessionId: linkSessionId})
            .then(newItem => {
                console.log(newItem, " was created in the database model.")
            })
            .catch(err => {
                console.log("this error occurred in createItemInDB ", err);
            })
        }
    })
}
var updateItemInDB = (update) => {
}

module.exports = {User, Users, getUserFromDB, getUserByOAuthFromDB, createUserInDB, createUserInDBByOAuth, updateUserInDB, userLoginDB, getPlansFromDB, createPlanInDB, updatePlanInDB, getItemsFromDB, createItemInDB, updateItemInDB}