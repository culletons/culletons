const plaid = require('plaid');
const keys = require('../config.js');

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
      response.json({'error': false});
    });
  },

}
