import React from 'react';

import BasicInfo from './BasicInfo.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    // GET USER INFO NOW
  }

  render() {
    return (
      <div className="container">
        NavBar
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-3">
            Dashboard
          </div>
          <div className="col-md-9">
            <BasicInfo />
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;