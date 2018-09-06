const mysql = require('mysql')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'culletons.cj3egt8fhnki.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'Culletons',
        password: 'culletons',
        database: 'Culletons'
    }
})

const bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('users', function (user) {
        user.increments('userId').primary();
        user.string('username', 255).notNullable();
        user.string('full name', 255).notNullable();
        user.string('password', 255).notNullable();
        user.string("email", 255).notNullable();
        user.integer('retirement age', 255);
        user.integer('retirement savings goal', 255);
        user.integer('dob', 255);
        user.integer('current income', 255);
        user.integer('current savings', 255);
        user.integer('savings per month', 255);
        user.integer('family size', 255);
        user.integer('number of kids', 255);
        user.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

// const connection = mysql.createConnection({
//     host: 'culletons.cj3egt8fhnki.us-east-1.rds.amazonaws.com',
//     port: '3306',
//     user: 'Culletons',
//     password: 'culletons',
//     database: 'Culletons'
//   })



  
  // connection.connect(function(err) {
  //   if (err) throw err
  //   console.log('You are now connected...')
  // })


  module.exports = {bookshelf, knex}

  
