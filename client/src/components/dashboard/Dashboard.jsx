import React from 'react';

import BasicInfo from './BasicInfo.jsx';
import SideRail from './SideRail.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      formBasicToggle: true
    }
  }

  componentDidMount() {
    // GET USER INFO NOW
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user} />
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
            <BasicInfo />
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;