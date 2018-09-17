import React from 'react';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }

  // Displays the table of accounts or the button to add a Plaid API link and retrieve those accounts.
  render () {
    if (this.props.accounts.accountList) {
      return (
        <div className="card module">
          <div className="card-body">
            <h3 className="card-title">Budget with Linked Accounts:</h3>
            <button id="link-btn" className="btn theme-btn" onClick={this.props.launchPlaidLink}>Link a New Account</button>
            <table className="table account-table">
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
                  <td>${account[1].balances.current.toLocaleString()}</td>
                </tr>
              ))}
              <tr>
                <th scope="row"></th>
                <td></td>
                <td><b>Total</b></td>
                <td><b>${this.props.accounts.userTotal.currentTotal.toLocaleString()}</b></td>
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