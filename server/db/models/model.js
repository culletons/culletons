const db = require('../connection');
const moment = require('moment');

// Model for the users of the application
var User = db.bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  plan: function() {
    return this.hasMany(Plan);
  },
  item: function() {
    return this.hasOne(Item);
  },
  goal: function() {
    return this.hasOne(Goal);
  }
});

// Model for the retirement plans created.  Tied to users
var Plan = db.bookshelf.Model.extend({
  tableName: 'plans',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

// Model for the items. One item corresponds to a Bank for a given user which Plaid can then exchange for that bank's account information.
// There is one per user per bank, not one per account.
var Item = db.bookshelf.Model.extend({
  tableName: 'items',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

// Model for goals.  Goals have been created for each user, but a user can create many goals.
var Goal = db.bookshelf.Model.extend({
  tableName: 'goals',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

// This is used to log the current balance for a user any time they log in.  In the future, this table will be helpful to track
// savings progress against the user's plan.
var SavingsHistory = db.bookshelf.Model.extend({
  tableName: 'savingsHistory',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

// Collection of users
var Users = db.bookshelf.Collection.extend({
  model: User
});

// // Searches and pulls one user by username and password not used now that Firebase authenticates.
// var getUserFromDB = (username, password) => {
//     return new User({username: username, password: password}).fetch()
//     .then(user => {
//         return user;
//     })
//     .catch(err => {
//         console.log("this error occurred in getUserFromDB ", err);
//     })
// }

// This is the current method for tracking users based on Firebase's provided token.  This works regardless of login method used within firebase.
var getUserByOAuthFromDB = (firebaseToken) => {
  return new User({ oAuthId: firebaseToken })
    .fetch()
    .then((user) => {
      console.log(user);
      return user;
    })
    .catch((err) => {
      console.log('this error occurred in getUserByOAuthFromDB ', err);
    });
};

// // Saves the new user as provided.  No longer used thanks to firebase
// var createUserInDB = (username, password, fullname, email) => {
//     return new User({ username: username }).fetch().then(function(found, err) {
//         if(!found){
//             return db.knex('users').insert({username: username, password: password, fullname: fullname, email: email})
//             .then(newUser => {
//                 return newUser;
//             })
//             .catch(err => {
//                 console.log("this error occurred in createUserInDB ", err);
//             })
//         }
//     })
// }

// Creates a user by saving thier firebase token and passed metadata.
var createUserInDBByOAuth = (firebaseToken, fullname, email, username) => {
  return new User({ oAuthId: firebaseToken })
    .fetch()
    .then(function(found) {
      if (!found) {
        return db
          .knex('users')
          .insert({ oAuthId: firebaseToken, fullname: fullname, email: email, username: username })
          .then((newUser) => {
            return newUser;
          })
          .catch((err) => {
            console.log('this error occurred in createUserInDBByOAuth ', err);
          });
      }
    })
    .catch((err) => {
      console.log('this is error occurred in createUSerin DB ', err);
    });
};

// Retrieves all plans for a user
var getPlansFromDB = (userIdToSearch) => {
  // console.log(userIdToSearch);
  return new Plan()
    .query({ where: { userId: userIdToSearch } })
    .fetchAll()
    .then((plan) => {
      return plan;
    })
    .catch((err) => {
      console.log('this error occurred in getPlansFromDB ', err);
    });
};

//accepts an array of objects to seed the database for balance and savings amounts in order to render the savings history chart
var seedSavingsHistory = (seed) => {
  seed.forEach((entry) => {
    return new SavingsHistory({
      userId: 7,
      balanceAmt: entry.balance,
      availableAmt: entry.savings,
      date: entry.date
    })
    .save()
    .then(function(newSave) {
      console.log(newSave, ' was created in the database model.');
    })
    .catch((err) => {
      console.log(err);
    })
  });
};

// Creates a new plan for the user
var createPlanInDB = (
  name,
  userId,
  retireAge,
  retireGoal,
  currentAge,
  annualIncome,
  currentSavings,
  monthlySavings,
  monthlySpending
) => {
  return db
    .knex('plans')
    .insert({
      name: name,
      userId: userId,
      retirementAge: retireAge,
      retireGoal: retireGoal,
      currentAge: currentAge,
      annualIncome: annualIncome,
      currentSavings: currentSavings,
      monthlySavings: monthlySavings,
      monthlySpending: monthlySpending
    })
    .then((newPlan) => {
      return newPlan;
    })
    .catch((err) => {
      console.log('this error occurred in createPlanInDB ', err);
    });
};

// Updates a new plan for user
var updatePlan = (name, id) => {
  db.knex('plans')
    .where('planId', id)
    .update({ name: name })
    .then((model) => {
      return model;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Deletes the plan by id
var deletePlan = (planId) => {
  new Plan()
    .query({ where: { planId: planId } })
    .destroy()
    .then((model) => {
      console.log('model deleted', model);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Retrieves all items for the given user
var getItemsFromDB = (userId) => {
  return new Item({ userId: userId })
    .query({ where: { userId: userId } })
    .fetchAll()
    .then((items) => {
      return items;
    })
    .catch((err) => {
      console.log('this error occurred in getItemsFromDB ', err);
    });
};

// Retrieves a single item  by its ID
var getItemByID = (id) => {
  return new Item({ itemId: id })
    .query({ where: { itemId: id } })
    .fetch()
    .then((item) => {
      return item;
    })
    .catch((err) => {
      console.log('this error occurred in getItemsFromDB ', err);
    });
};

// Saves an item in the DB for the user
var createItemInDB = (userId, accessToken, institutionName, institutionId, linkSessionId) => {
  // console.log(userId, accessToken, institutionName, institutionId, linkSessionId);
  return new Item({ userId: userId, institutionId: institutionId })
    .fetch()
    .then(function(found, err) {
      if (!found) {
        return db
          .knex('items')
          .insert({
            userId: userId,
            itemToken: accessToken,
            institutionName: institutionName,
            institutionId: institutionId,
            linkSessionId: linkSessionId
          })
          .then((newItem) => {
            // console.log(newItem, " was created in the database model.")
            return newItem;
          })
          .catch((err) => {
            console.log('this error occurred in createItemInDB ', err);
          });
      }
    });
};

// Retrieves all of the goals for the user
var getGoalsFromDB = (userId) => {
  return new Goal({ userId: userId })
    .query({ where: { userId: userId } })
    .fetchAll()
    .then((goals) => goals)
    .catch((err) => console.log('this error occured in getGoalsFromDB', err));
};

// Creates a goal for the user
var createGoalInDB = (userId, familySize, numberOfKids, travel, hobbySpending, luxurySpending) => {
  return new Goal({ userId: userId }).fetch().then((found, err) => {
    if (!found) {
      return db
        .knex('goals')
        .insert({
          userId: userId,
          familySize: familySize,
          numberOfKids: numberOfKids,
          travel: travel,
          hobbySpending: hobbySpending,
          luxurySpending: luxurySpending
        })
        .then((newGoal) => {
          return newGoal;
        })
        .catch((err) => console.log('this error occured in createGoalInDB', err));
    }
  });
};


// creates a record of the user's savings total, for a given day.
var addSavingHistory = (userId, savingsAmt, availableAmt) => {
  let today = moment().format('l');
  return new SavingsHistory({ userId: userId, date: today }).fetch().then((found, err) => {
    if (!found) {
      return new SavingsHistory({
        userId: userId,
        balanceAmt: savingsAmt,
        availableAmt: availableAmt,
        date: today
      })
        .save()
        .then(function(newSave) {
          // console.log(newSave, ' was created in the database model.');
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          return new SavingsHistory({ userId: userId })
            .query({ where: { userId: userId } })
            .fetchAll();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return new SavingsHistory()
        .where({ userId: userId, date: today })
        .save(
          { userId: userId, balanceAmt: savingsAmt, availableAmt: availableAmt, date: today },
          { patch: true }
        )
        .then(function(newSave) {
          // console.log(newSave, ' was created in the database model.');
        })
        .catch((err) => {
          console.log('this error occurred in createItemInDB ', err);
        })
        .then(() => {
          return new SavingsHistory({ userId: userId })
            .query({ where: { userId: userId } })
            .fetchAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

//fetches the savings history for a user in order to render it in a chart
var getSavingsHistory = () => {
  return new SavingsHistory()
  .query({ where: { userId : '7' }})
  .fetchAll()
  .then((data) => {
    return data;
  })
};


module.exports = {
  User,
  Users,
  getUserByOAuthFromDB,
  createUserInDBByOAuth,
  getPlansFromDB,
  createPlanInDB,
  updatePlan,
  deletePlan,
  getItemsFromDB,
  createItemInDB,
  getGoalsFromDB,
  createGoalInDB,
  getItemByID,
  addSavingHistory,
  seedSavingsHistory,
  getSavingsHistory
};
