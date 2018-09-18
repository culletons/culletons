// These controller functions work to retireve account information provided by Plaid's API.   At a high level you need to recieve from the front
// end a public key, and then exchange it for a private token on your backend, which then can securely request data for that user.
const plaid = require('plaid');
const keys = require('../config.js');
const model = require('../db/models/model.js');

// Plaid keys can be gained offline, here they are referenced from a config.js file in the /server/ folder.   This client helps to kick off the
// exchange with Plaid: https://plaid.com/docs/quickstart/#user-authentication-item-creation-and-the-public_token
var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID || keys.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET || keys.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY || keys.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
);

module.exports = {
  // This function recieves the public token and returns the private key
  getAccessToken: (request, response) => {
    PUBLIC_TOKEN = request.body.public_token;
    metadata = request.body.metadata;
    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      if (error != null) {
        console.log('Could not exchange public_token!' + '\n' + JSON.stringify(error));
        response.sendStatus(500);
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      model
        .createItemInDB(
          request.body.userId,
          ACCESS_TOKEN,
          metadata.institution.name,
          metadata.institution.institution_id,
          metadata.link_session_id
        )
        .then((item) => {
          response.sendStatus(200);
        })
        .catch((err) => {
          console.log('this error occurred in createItem ', err);
          response.sendStatus(500);
        });
    });
  },

  // This function retireves account data for the user.
  getAccounts: (req, res) => {
    model
      .getItemByID(req.query.itemId)
      .then((item) => {
        // console.log("this is returned from getItem ", item)
        client.getAuth(item.attributes.itemToken, (error, numbersData) => {
          if (error != null) {
            var msg = 'Unable to pull accounts from Plaid API.';
            console.log(msg + '\n' + error);
            return res.json({ error: msg });
          }
          // console.log(numbersData);
          res.send(numbersData);
        });
      })
      .catch((err) => {
        console.log('this error occurred while pulling an Item ', err);
        res.sendStatus(500);
      });
  },

  // This is an update of the history of a user's current savings.  The update is later retrieved as part of the accounts model, and therefore we
  // have grouped it here, even though it is not from Plaid.
  updateHistory: (req, res) => {
    model
      .addSavingHistory(req.body.userId, req.body.currentBalance, req.body.currentSavings)
      .then((history) => {
        res.send(history);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
