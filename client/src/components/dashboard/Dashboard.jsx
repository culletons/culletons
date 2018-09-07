import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx'
import SideRail from './SideRail.jsx';
import Forms from './Forms.jsx'
import Overview from './Overview.jsx'



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo add state for designated main plan, allow user to set main plan
      plans: [],
      activePlan: [],
      formToggle: false,
      overviewToggle: true,
      accountToggle: true,
      items: null
    }
    this.createPlan = this.createPlan.bind(this)
    this.viewPlan = this.viewPlan.bind(this)
    this.updatePlans = this.updatePlans.bind(this);
    this.setActivePlan = this.setActivePlan.bind(this)
  }

  createPlan() {
    this.setState({ 
      formToggle: true
    })
  }

  viewPlan(plan) {
    this.setState({activePlan: plan})
  }

  deletePlan(id) {

  }

  setActivePlan(plan) {
    console.log(plan)
    this.setState({
      activePlan: plan
    })
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
        plans: res.data,
        activePlan:res.data[0]
      })
    }).catch(err => {console.log(err)})
    // if plans already exist, render overview. clicking add plan will rerender the forms
    // if(this.state.plans.length > 0) {
    //   this.setState({ formToggle: false})
    // }
    // this.updatePlans();
  }



  render() {
    return (
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user} setActivePlan={this.setActivePlan} currentUserId={this.props.currentUserId} plans={this.state.plans} createPlan={this.createPlan}/>
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
          {this.state.overviewToggle && <Overview activePlan={this.state.activePlan} plans={this.state.plans} />}
            {this.state.formToggle && <Forms user={this.props.user} />}
            {this.state.accountToggle && <Accounts user={this.props.user} currentUserId={this.props.currentUserId}/>}
          </div>
        </div>
    );
  }

}

export default Dashboard;