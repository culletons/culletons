import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx'
import BasicInfo from './BasicInfo.jsx';
import SideRail from './SideRail.jsx';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo add state for designated main plan, allow user to set main plan
      plans: [{ currentSavings: 0 }],
      formBasicToggle: true,
      overviewToggle: false,
      items: null
    }
    this.onAddPlan = this.onAddPlan.bind(this)
    this.updatePlans = this.updatePlans.bind(this);
  }

  onAddPlan() {
    // render form
    this.setState({ formBasicToggle: true})
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

  componentDidMount() {
    axios.get('retire/plans', {
      params: {
        userId: this.props.user.userId
      }
    }).then(res => {
      this.setState({
        plans: res.data
      })
    }).catch(err => {console.log(err)})

    if(this.state.plans.length > 0) {
      // if plans already exist, render overview. clicking add plan will rerender the forms
      this.setState({ formBasicToggle: false})
    }
    this.updatePlans();
  }



  render() {
    return (
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user}  currentUserId={this.props.currentUserId} plans={this.state.plans}/>
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
          {this.state.overviewToggle && <Overview plans={this.state.plans} />}
            {this.state.formBasicToggle && <BasicInfo user={this.props.user} />}
            <Accounts user={this.props.user} currentUserId={this.props.currentUserId}/>
          </div>
        </div>
    );
  }

}

export default Dashboard;