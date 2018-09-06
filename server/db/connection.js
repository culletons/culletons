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
        user.string('username', 255)
        user.string('full name', 255)
        user.string('password', 255)
        user.string("email", 255)
        user.string('OAuthToken', 255)
        user.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

  bookshelf.knex.schema.hasTable('plans').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('plans', function (plan) {
        plan.foreign('userId').references('userId').inTable('users');
        plan.increments('planId').primary();
        plan.integer('retirement age').notNullable();
        plan.integer('retirement savings goal').notNullable();
        plan.integer('dob').notNullable();
        plan.integer('current income').notNullable();
        plan.integer('current savings').notNullable();
        plan.integer('savings per month').notNullable();
        plan.integer('family size');
        plan.integer('number of kids');
        plan.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      })
    }
  });

  bookshelf.knex.schema.hasTable('items').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('items', function (item) {
        item.foreign('userId').references('userId').inTable('users');
        item.increments('itemId').primary();
        item.string('item', 255);
        item.timestamps();
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

  
