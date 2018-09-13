import React from 'react';
import axios from 'axios';


class Accounts extends React.Component {
  constructor(props) {
    super(props);

    
  }



  render () {
    if (this.props.accounts.accountList) {
      return (
        <div className="card module">
          <div className="card-body">
            <h3 className="card-title">Budget with Linked Accounts:</h3>
            <button id="link-btn" className="btn theme-btn" onClick={this.props.launchPlaidLink}>Link a New Account</button>
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Institution</th>
                <th scope="col">Accounts</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.props.accounts.accountList).map((account, i) => (
                <tr key={account[1].account_id}>
                  <th scope="row">{i + 1}</th>
                  <td>{account[1].institutionName}</td>
                  <td>{account[1].name}</td>
                  <td>{account[1].balances.current}</td>
                </tr>
              ))}
              <tr>
                <th scope="row"></th>
                <td></td>
                <td><b>Total</b></td>
                <td><b>{this.props.accounts.userTotal.currentTotal}</b></td>
              </tr>
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
            <button id="link-btn" className="btn btn-success" onClick={this.props.launchPlaidLink}>Link a New Account</button>
          </div>
        </div>
      )
    }
  }
}

export default Accounts;