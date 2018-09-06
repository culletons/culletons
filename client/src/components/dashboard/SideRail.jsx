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

      <div className="card side-rail">
        <div className="card-body">
          <h3 className="card-title">Your Profile:</h3>
          <br/>


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