import React from 'react';
import axios from 'axios';
import BasicInfo from './BasicInfo.jsx';
import SideRail from './SideRail.jsx';
import Overview from './Overview.jsx'

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
  }

  onAddPlan() {
    // render form
    this.setState({ formBasicToggle: true})
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
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-3">
            <SideRail user={this.props.user} plans={this.state.plans} onAddPlan={this.onAddPlan} />
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
          {this.state.overviewToggle && <Overview plans={this.state.plans} />}
            {this.state.formBasicToggle && <BasicInfo user={this.props.user} />}
          </div>
        </div>
    );
  }

}

export default Dashboard;