const expect = require('chai').expect;
const axios = require('axios');

const app = require('../server/culletons.js');

describe('', function() {

  let server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('App is listening on 3000');
    })
  });


  after(function(){
    server.close();
  });

});