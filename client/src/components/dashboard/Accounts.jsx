import React from 'react';
import axios from 'axios';


class Accounts extends React.Component {
  constructor(props) {
    super(props);

    
  }



  render () {
    if (this.props.items) {
      return (
        <div className="card module">
          <div className="card-body">
            <h3 className="card-title">Budget with Linked Accounts:</h3>
            <button id="link-btn" className="btn btn-success" onClick={this.launchPlaidLink}>Link a New Account</button>
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Institution</th>
                <th scope="col">Accounts</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items && this.props.items.map((item, i) => (
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