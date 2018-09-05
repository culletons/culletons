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
const db = require('bookshelf')(knex);

db.knex.schemadb.hasTable('users').then(function(exists) {
    if (!exists) {
      db.knex.schema.createTable('users', function (user) {
        user.increments('id').primary();
        user.string('username', 255);
        user.string('password', 255);
        user.string("email", 255);
        user.integer('Answer1', 255);
        user.integer('Answer2', 255);
        user.integer('Answer3', 255);
        user.integer('Answer4', 255);
        user.integer('Answer5', 255);
        user.integer('Answer6', 255);
        user.integer('Answer7', 255);
        user.integer('Answer8', 255);
        user.integer('Answer9', 255);
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



  
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  })

  
