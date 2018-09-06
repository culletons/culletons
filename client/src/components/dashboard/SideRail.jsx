import React from 'react';
import axios from 'axios';
import BasicInfo from './BasicInfo.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }

    this.launchPlaidLink = this.launchPlaidLink.bind(this);
  }

  componentDidMount() {
    // Plaid app needs to initialize it's "Link" feature through which accounts can be added. https://plaid.com/docs/#integrating-with-link
    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '2dec9b90cfcc7a2d76b295ac1b3504',
      onSuccess: function(public_token, metadata) {   // Defining what should happen upon success of the Plaid 'Link' feature, at minimum, send public_token to our server.
        console.log("HEY THIS IS THE RESPONSE FROM PLAID: " + public_token);
        axios.post('/retire/get_access_token', {
         
            public_token: public_token,
            metadata: metadata
          
        })
        .then(() => {
          // HERE WE MANIPULATE STATE TO SHOW THAT IT WAS SUCCESSFUL
        })
        .catch((err) => {
          console.log('Plaid didnt work!' + err);
        })
      },
    });
  }

  launchPlaidLink() {
    this.handler.open();
  }

  render() {
    return (

      <div className="card side-rail">
        <div className="card-body">
          <h3 className="card-title">Your Profile:</h3>
          <br/>
          <button id="link-btn" className="btn btn-success" onClick={this.launchPlaidLink}>Link Account</button>


          <ul className="list-group">
            <li className="list-group-item">Basic Info</li>
            <li className="list-group-item">Monthly Budget</li>
            <li className="list-group-item">..</li>
            <li className="list-group-item">..</li>
          </ul>
          
        </div>
     </div>
    );
  }

}

export default Dashboard;