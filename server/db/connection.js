const mysql = require('mysql')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'culletons.cj3egt8fhnki.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'Culletons',
        password: 'culletons',
        database: 'Culletons'
    },
    useNullAsDefault: true
})

const bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('users', function (user) {
        user.increments('userId').primary();
        user.string('username', 255)
        user.string('fullname', 255)
        user.string('password', 255)
        user.string("email", 255)
        user.string('oAuthToken', 255)
        user.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

  bookshelf.knex.schema.hasTable('plans').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('plans', function (plan) {
        plan.integer('userId')
        plan.increments('planId').primary();
        plan.integer('retirementAge').notNullable();
        plan.integer('retireGoal').notNullable();
        plan.integer('currentAge').notNullable();
        plan.integer('currentSavings').notNullable();
        plan.integer('monthlySavings').notNullable();
        plan.integer('monthlySpending').notNullable();
        plan.integer('familySize');
        plan.integer('numberOfKids');
        plan.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      })
    }
  });

  bookshelf.knex.schema.hasTable('items').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('items', function (item) {
        item.increments('itemId').primary();
        item.integer('userId')
        item.string('item', 255);
        item.string('itemToken', 255);
        item.string('institutionName', 255);
        item.string('institutionId', 255);
        item.string('linkSessionId', 255);
        item.timestamps();
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

  module.exports = {bookshelf, knex}

  
