const db = require('../connection')


var User = db.bookshelf.Model.extend({
    tableName: 'users',
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
    hasTimeStamps: true,
    user: function() {
      return this.belongsTo(User);
    }
  });

var Item = db.bookshelf.Model.extend({
    tableName: 'items',
    hasTimeStamps: true,
    user: function() {
      return this.belongsTo(User);
    }
});
  
var Users = db.bookshelf.Collection.extend({  
    model: User
});

var getUserFromDB = (username, password) => {
    return new User({username: username, password: password}).fetch()
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getUserFromDB ", err);
    })
}

var getUserByOAuthFromDB = (OAuthId) => {
    return new User({oAuthId: OAuthId}).fetch()
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log("this error occurred in getUserByOAuthFromDB ", err);
    })
}

var createUserInDB = (username, fullname, password, email) => {
    return new User({ username: username }).fetch().then(function(found, err) {
        if(!found){
            return db.knex('users').insert({username: username, fullname: fullname, password: password, email: email})
            .then(newUser => {
                console.log(newUser, " was created in the database model.")
                return newUser;
            })
            .catch(err => {
                console.log("this error occurred in createUserInDB ", err);
            })
        }
    })
}

var createUserInDBByOAuth = (oAuthId, fullname, email, username) => {
    console.log("this is token ", oAuthId)
    return (new User({ oAuthId: oAuthId })).fetch().then(function(found) {
        if(!found){
            return db.knex('users').insert({oAuthId: oAuthId, fullname: fullname, email: email, username: username})
            .then(newUser => {
                console.log(newUser, " was created in the database model.")
                return newUser;
            })
            .catch(err => {
                console.log("this error occurred in createUserInDBByOAuth ", err);
            })
        }
    })
    .catch(err => {
        console.log("this is error occurred in createUSerin DB ", err)
    })
}

var updateUserInDB = (update) => {
}

var userLoginDB = (req, res) => {

}

var getPlansFromDB = (userIdToSearch) => {
  console.log(userIdToSearch);
  return new Plan({userId: userIdToSearch}).query({where: {userId: userIdToSearch}}).fetchAll()    
  .then(plan => {
    return plan;
  })
  .catch(err => {
    console.log("this error occurred in getPlansFromDB ", err);
  })
}

var createPlanInDB = (userId, retireAge, retireGoal, currentAge, currentSavings, monthlySavings, monthlySpending) => {
  return db.knex('plans').insert({userId: userId, retirementAge: retireAge, retireGoal: retireGoal, currentAge: currentAge, currentSavings: currentSavings, monthlySavings: monthlySavings, monthlySpending: monthlySpending})
  .then(newPlan => {
      console.log(newPlan, " was created in the database model.")
      return newPlan;
  })
  .catch(err => {
      console.log("this error occurred in createPlanInDB ", err);
  })
}
var updatePlanInDB = (update) => {
}

var getItemsFromDB = (userId) => {
    return new Item({userId: userId}).query({where: {userId: userId}}).fetchAll() 
    .then(items => {
        return items;
    })
    .catch(err => {
        console.log("this error occurred in getItemsFromDB ", err);
    })
}

var createItemInDB = (userId, accessToken, institutionName, institutionId, linkSessionId) => {
    return new Item({ userId: userId, institutionId: institutionId }).fetch().then(function(found, err) {
        if(!found){
            return db.knex('items').insert({userId: userId, itemToken: accessToken, institutionName: institutionName, institutionId: institutionId, linkSessionId: linkSessionId})
            .then(newItem => {
                console.log(newItem, " was created in the database model.")
                return newItem;
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