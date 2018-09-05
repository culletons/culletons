const db = require('../connection')


var User = db.Model.extend({
    tablename: 'users',
    hasTimeStamps: true,
    // verifyPassword: function(password) {
    //     return this.get('password') === password;
    // },
    // byEmail: function(email) {
    //     return this.forge().query({where:{ email: email }}).fetch();
    // }

})

var Users = db.Collection.extend({  
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

var createUserInDB = (username, fullName, password, email) => {
    if(!getUserFromDB(username)){
        db.knex('users').insert({username: username}, {fullName: fullName}, {password: password}, {email: email})
        .then(newUser => {
            console.log(newUser, " was created in the database model.")
        })
        .catch(err => {
            console.log("this error occurred in createUserInDB ", err);
        })
    }
}

var updateUserInDB = (update) => {
}

var userLoginDB = (req, res) => {

}

module.exports = {User, Users, getUserFromDB, createUserInDB, updateUserInDB, userLoginDB}