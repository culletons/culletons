import React from 'react';
import axios from 'axios';

import BasicInfo from './BasicInfo.jsx';
import SideRail from './SideRail.jsx';
import Accounts from './Accounts.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: []
    }

    this.updatePlans = this.updatePlans.bind(this);
  }

  componentDidMount() {
    this.updatePlans();
  }

  updatePlans() {
    axios.get('/retire/plans', { params: {userId: this.props.currentUserId } })
         .then(({data}) => {
           this.setState({
           plans: data
           })
         })
         .catch((err) => {
           console.log(err);
         })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user} currentUserId={this.props.currentUserId} plans={this.state.plans}/>
          </div>
          <div className="col-md-9">
            <BasicInfo />
            <br/>
            <Accounts user={this.props.user} currentUserId={this.props.currentUserId}/>
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;