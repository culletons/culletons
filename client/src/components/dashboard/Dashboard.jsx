import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx'
import SideRail from './SideRail.jsx';
import Overview from './Overview.jsx'
import GoalInfo from './goalInfo.jsx';
import BasicInfo from './BasicInfo.jsx'



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      activePlan: null,
      goals: null,
      formToggle: false,
      overviewToggle: true,
      accountToggle: true,
      items: null

    }
    this.createPlan = this.createPlan.bind(this)
    this.updatePlans = this.updatePlans.bind(this);
    this.setActivePlan = this.setActivePlan.bind(this)
    this.setOverview = this.setOverview.bind(this)
    this.deletePlan = this.deletePlan.bind(this)
    this.editPlanName = this.editPlanName.bind(this)
    this.submitBasic = this.submitBasic.bind(this)
  }

  createPlan() {
    this.setState({ 
      formToggle: true,
      overviewToggle: false
    })
  }

  deletePlan(id) {
    axios.delete('/retire/plans', {
      params: {planId: id}})
      .then(res => {
        this.updatePlans()
    })
    .catch(err => {
      console.log(err)
    })
  }

  editPlanName(name, id) {
    axios.put('/retire/plans', {name: name, planId: id})
    .then(res => {
      this.updatePlans()
    })
    .catch(err => {
      console.log(err)
    })
  }

  setActivePlan(plan) {
    this.setState({
      activePlan: plan
    })
  }

  submitBasic(info) {
    axios.post('/retire/plans', info
    ).then(res => {
      this.updatePlans()
    }).catch(err => {console.log(err)})
    console.log('Trying to submit');
  }

  updatePlans() {
    axios.get('/retire/plans', { params: {userId: this.props.userData.userId } })
      .then(({data}) => {
        this.setState({
          plans: data
        })
        if(this.state.plans && this.state.plans.length > 0) {
          this.setState({ formBasicToggle: false})
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateGoals() {
    axios.get('retire/goals', {params:{ userId:this.props.userData.userId }})
    .then(({data}) => {
      this.setState({goals: data})
      if (this.state.goals) {
        this.setState({ formGoalsToggle: false })
      }
    })
    .catch(err => {console.log(err)})
  }

  setOverview() {
    this.setState({
      overviewToggle: true,
      formToggle: false
    })
  }

  componentDidMount() {
    if (this.props.userData.userId) {
      this.updatePlans();
      this.updateGoals();
    }
  }



  render() {
    return (
      <div className="row">

        <div className="col-md-2">
          <SideRail editPlanName={this.editPlanName} deletePlan={this.deletePlan} setOverview={this.setOverview} user={this.props.user} setActivePlan={this.setActivePlan} currentUserId={this.props.userData && this.props.userData.userId} plans={this.state.plans} createPlan={this.createPlan} goals={this.state.goals} />
        </div>
        <div className="col-md-10">
          {this.state.formToggle && <BasicInfo submitBasic={this.submitBasic} user={this.props.userData} />}
          {this.state.formToggle && <GoalInfo user={this.props.userData} />}

          <div className="row">
            <div className="col-md-6">
              {this.state.overviewToggle && <Overview activePlan={this.state.activePlan} plans={this.state.plans} />}</div>
            {/* {this.state.accountToggle && <Accounts user={this.props.user} currentUserId={this.props.currentUserId}/>} */}
            <div className="col-md-auto"><Accounts user={this.props.user} currentUserId={this.props.userData.userId} /></div>
          </div></div>

      </div>
    );
  }

}

export default Dashboard;