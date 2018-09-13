const plaid = require('plaid');
const keys = require('../config.js');
const model = require('../db/models/model.js');

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID || keys.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET || keys.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY || keys.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
);

module.exports = {

  getAccessToken: (request, response) => {
    console.log("Getting Access Token from Public Token " + request.body.public_token);
    PUBLIC_TOKEN = request.body.public_token;
    metadata = request.body.metadata;
    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      if (error != null) {
        console.log('Could not exchange public_token!' + '\n' + JSON.stringify(error));
        response.sendStatus(500);
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      console.log('Access Token: ' + ACCESS_TOKEN);
      console.log('Item ID: ' + ITEM_ID); 
      console.log('Metadata: ' + metadata);
      model.createItemInDB(request.body.userId, ACCESS_TOKEN, metadata.institution.name, metadata.institution.institution_id, metadata.linkSessionId)
      .then(item => {
        console.log(`Item for ${request.body.userId} at ${metadata.institution.name} was created in the database.`)
        response.sendStatus(200);
      })
      .catch(err => {
        console.log("this error occurred in createItem ", err)
        response.sendStatus(500);
      });
    });
  },

  getAccounts: (req, res) => {
    console.log("this is req.query in getItem ", req.query)
    model.getItemByID(req.query.itemId)
    .then(item => {
      console.log("this is returned from getItem ", item)
      client.getAuth(item.attributes.itemToken, (error, numbersData) => {
        if(error != null) {
          var msg = 'Unable to pull accounts from Plaid API.';
          console.log(msg + '\n' + error);
          return res.json({error: msg});
        }
        console.log(numbersData);
        res.send(numbersData); 
      });
    })
    .catch(err => {
      console.log("this error occurred while pulling an Item ", err)
      res.sendStatus(500);
    });
  },

  updateHistory: (req, res) => {
    model.addSavingHistory(req.body.userId, req.body.currentBalance, req.body.currentSavings)
      .then((history) => {
        res.send(history);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }

}
