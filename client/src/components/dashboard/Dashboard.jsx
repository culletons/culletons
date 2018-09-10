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
    console.log(this.props.userData.userId)
    axios.get('/retire/plans', { params: {userId: this.props.userData.userId } })
         .then(({data}) => {
            this.setState({
             plans: data
            })
            if(this.state.plans && this.state.plans.length > 0) {
            // if plans already exist, render overview. clicking add plan will rerender the forms
              this.setState({ formBasicToggle: false})
            }
         })
         .catch((err) => {
           console.log(err);
         })
  }

  componentDidMount() {
    // axios.get('retire/plans', {
    //   params: {
    //     userId: this.props.user && this.props.user.userId
    //   }
    // }).then(res => {
    //   this.setState({
    //     plans: res.data
    //   })
    // }).catch(err => {console.log(err)})
    if (this.props.userData.userId) {
      this.updatePlans();
    }

    // if(this.state.plans && this.state.plans.length > 0) {
    //   // if plans already exist, render overview. clicking add plan will rerender the forms
    //   this.setState({ formBasicToggle: false})
    // }
    // this.updatePlans();
  }



  render() {
    return (
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user} currentUserId={this.props.userData && this.props.userData.userId} plans={this.state.plans}/>
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
          {this.state.overviewToggle && <Overview plans={this.state.plans} />}
            {this.state.formBasicToggle && <BasicInfo user={this.props.user} />}
            <Accounts user={this.props.user} currentUserId={this.props.userData.userId}/>
          </div>
        </div>
    );
  }

}

export default Dashboard;