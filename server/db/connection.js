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
    useNullAsDefault: true,
    pool: { 
      min: 0, 
      max: 200,
    },
    acquireConnectionTimeout: 10000
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
        user.string('oAuthId', 255)
        user.timestamps();
        user.timestamps(true, true);
      })
      .then(function (table) {
        console.log('Created Table', table);
      })
      .then(()=>{
        knex.destroy();
    })
    }
  });

  bookshelf.knex.schema.hasTable('plans').then(function(exists) {
    if (!exists) {
      bookshelf.knex.schema.createTable('plans', function (plan) {
        plan.integer('userId')
        plan.increments('planId').primary();
        plan.string('name', 255)
        plan.integer('retirementAge').notNullable();
        plan.integer('retireGoal').notNullable();
        plan.integer('currentAge').notNullable();
        plan.integer('annualIncome').notNullable();
        plan.integer('currentSavings').notNullable();
        plan.integer('monthlySavings').notNullable();
        plan.integer('monthlySpending').notNullable();
        plan.timestamps(true, true);
      })
      .then(function (table) {
        console.log('Created Table', table);
      })
      .then(()=>{
        knex.destroy();
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
        item.timestamps(true, true);
      })
      .then(function (table) {
        console.log('Created Table', table);
      })
      .then(()=>{
        knex.destroy();
    })
    }
  });

  bookshelf.knex.schema.hasTable('goals').then(function(exists) {
    if(!exists) {
      bookshelf.knex.schema.createTable('goals', function(goal) {
        goal.increments('goalId').primary();
        goal.integer('userId')
        goal.integer('familySize');
        goal.integer('numberOfKids');
        goal.integer('travel');
        goal.integer('hobbySpending');
        goal.integer('luxurySpending');
        goal.timestamps(true, true);
      })
      .then(function (table) {
        console.log("Created Table goals", table)
      })
      .then(() => {
        knex.destroy();
      })
    }
  });

  bookshelf.knex.schema.hasTable('savingsHistory').then(function(exists) {
    if(!exists) {
      bookshelf.knex.schema.createTable('savingsHistory', function(savingsCheck) {
        savingsCheck.increments('savingsCheckId').primary();
        savingsCheck.integer('userId')
        savingsCheck.integer('balanceAmt');
        savingsCheck.string('date');
        savingsCheck.integer('availableAmt');
        savingsCheck.timestamps(true, true);
      })
      .then(function (table) {
        console.log("Created Table savingsHistory", table)
      })
      .then(() => {
        knex.destroy();
      })
    }
  });

  module.exports = {bookshelf, knex}

  
