import React from 'react';
import axios from 'axios';


class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }

    this.launchPlaidLink = this.launchPlaidLink.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    // Plaid app needs to initialize it's "Link" feature through which accounts can be added. https://plaid.com/docs/#integrating-with-link
    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '2dec9b90cfcc7a2d76b295ac1b3504',
      onSuccess: (public_token, metadata) => {   // Defining what should happen upon success of the Plaid 'Link' feature, at minimum, send public_token to our server.
        axios.post('/retire/get_access_token', {
          public_token: public_token,
          metadata: metadata,
          userId: this.props.currentUserId
        })
        .then(() => {
          console.log('Post Successful');
          this.updateItems();
        })
        .catch((err) => {
          console.log('Plaid didnt work!' + err);
        })
      },
    });

    this.updateItems();
  }

  updateItems() {
    axios.get('/retire/items',{ params: {userId: this.props.currentUserId } })
         .then(({data}) => {
           this.setState({
           items: data
           })
         })
         .catch((err) => {
           console.log(err);
         })
  }

  launchPlaidLink() {
    this.handler.open();
  }

  render () {
    if (this.state.items) {
      return (
        <div className="card module">
          <div className="card-body">
            <h3 className="card-title">Budget with Linked Accounts:</h3>
            <button id="link-btn" className="btn theme-btn" onClick={this.launchPlaidLink}>Link a New Account</button>
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Institution</th>
                <th scope="col">Accounts</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items && this.state.items.map((item, i) => (
              <tr key={item.itemId}>
                <th scope="row">{i + 1}</th>
                <td>{item.institutionName}</td>
                <td>NEED ACCT DATA</td>
              </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card module">
          <div className="card-body">
            <h3 className="card-title">Budget with Linked Accounts:</h3>
            <button id="link-btn" className="btn btn-success" onClick={this.launchPlaidLink}>Link a New Account</button>
          </div>
        </div>
      )
    }
  }
}

export default Accounts;