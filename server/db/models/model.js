const db = require('../connection')
const moment = require('moment');

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
    },
    goal: function() {
        return this.hasOne(Goal);
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

var Goal = db.bookshelf.Model.extend({
    tableName: 'goals',
    hasTimeStamps: true,
    user: function() {
      return this.belongsTo(User);
    }
})

var SavingsHistory = db.bookshelf.Model.extend({
  tableName: 'savingsHistory',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
})
  
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

var createUserInDB = (username, password, fullname, email) => {
    return new User({ username: username }).fetch().then(function(found, err) {
        if(!found){
            return db.knex('users').insert({username: username, password: password, fullname: fullname, email: email})
            .then(newUser => {
                // console.log(newUser, " was created in the database model.")
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
                // console.log(newUser, " was created in the database model.")
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
  return new Plan().query({where: {userId: userIdToSearch}}).fetchAll()    
  .then(plan => {
    return plan;
  })
  .catch(err => {
    console.log("this error occurred in getPlansFromDB ", err);
  })
}

var createPlanInDB = (name, userId, retireAge, retireGoal, currentAge, annualIncome, currentSavings, monthlySavings, monthlySpending) => {
  return db.knex('plans').insert({name: name, userId: userId, retirementAge: retireAge, retireGoal: retireGoal, currentAge: currentAge, annualIncome: annualIncome, currentSavings: currentSavings, monthlySavings: monthlySavings, monthlySpending: monthlySpending})
  .then(newPlan => {
    //   console.log(newPlan, " was created in the database model.")
      return newPlan;
  })
  .catch(err => {
      console.log("this error occurred in createPlanInDB ", err);
  })
}
var updatePlan = (name, id) => {
    db.knex('plans').where('planId', id).update({name: name})
    .then(model => {
        return model
    })
    .catch(err => {
        console.log(err)
    })
}

var deletePlan = (planId) => {
    new Plan().query({where: {planId: planId}}).destroy()
    .then(model => {
        console.log('model deleted', model)
    })
    .catch(err => {
        console.log('err', err)
    })
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

var getItemByID = (id) => {
  return new Item({itemId: id}).query({where: {itemId: id}}).fetch() 
  .then(item => {
      return item;
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
                // console.log(newItem, " was created in the database model.")
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

var getGoalsFromDB = (userId) => {
  return new Goal({userId: userId}).query({where: {userId: userId}}).fetchAll()
  .then(goals => goals)
  .catch(err => console.log('this error occured in getGoalsFromDB', err))
}

var createGoalInDB = (userId, familySize, numberOfKids, travel, hobbySpending, luxurySpending) => {
  return new Goal({ userId: userId }).fetch().then((found, err) => {
    if(!found) {
      return db.knex('goals').insert({
        userId: userId, 
        familySize: familySize, 
        numberOfKids: numberOfKids, 
        travel: travel, 
        hobbySpending: hobbySpending, 
        luxurySpending: luxurySpending
      })
      .then(newGoal => {
        // console.log(newGoal, "was created in the database model.")
        return newGoal
      })
      .catch((err) => console.log("this error occured in createGoalInDB", err))
    }
  })
}

var updateGoalInDB = (update) => {
  
}


var addSavingHistory = (userId, savingsAmt, availableAmt) => {
  let today = moment().format('l');
  return new SavingsHistory({ userId: userId, date: today }).fetch().then((found, err) => {
    if(!found) {
      return new SavingsHistory({ userId: userId, balanceAmt: savingsAmt, availableAmt: availableAmt, date: today})
        .save()
        .then(function(newSave) {
          console.log(newSave, " was created in the database model.")
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          return new SavingsHistory({userId: userId}).query({where: {userId: userId}}).fetchAll()
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return new SavingsHistory()
        .where({ userId: userId, date: today})
        .save({ userId: userId, balanceAmt: savingsAmt, availableAmt: availableAmt, date: today}, {patch: true})
        .then(function(newSave) {
          console.log(newSave, " was created in the database model.")
        })
        .catch(err => {
          console.log("this error occurred in createItemInDB ", err);
        })
        .then(() => {
          return new SavingsHistory({userId: userId}).query({where: {userId: userId}}).fetchAll()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })

  
}

module.exports = {
  User, Users, getUserFromDB, getUserByOAuthFromDB, createUserInDB, 
  createUserInDBByOAuth, updateUserInDB, userLoginDB, 
  getPlansFromDB, createPlanInDB, updatePlan, deletePlan,
  getItemsFromDB, createItemInDB, updateItemInDB,
  getGoalsFromDB, createGoalInDB, updateGoalInDB,
  getItemByID, addSavingHistory
}