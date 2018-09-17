import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx'
import SideRail from './SideRail.jsx';
import Overview from './Overview.jsx'
import GoalInfo from './goalInfo.jsx';
import BasicInfo from './BasicInfo.jsx'
import LineChart from '../charts/LineChart.jsx';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      activePlan: null,
      goals: null,
      formBasicToggle: true,
      formGoalsToggle: true,
      overviewToggle: true,
      items: [],
      accounts: {
        userTotal: {
          currentTotal: 0,
          currentAvailable: 0,
          history: {}
        },
        accountList: []
      },
      formToggle: false,
      accountToggle: true,
      items: null

    }
    this.createPlan = this.createPlan.bind(this)
    this.updatePlans = this.updatePlans.bind(this);
    this.launchPlaidLink = this.launchPlaidLink.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.getUserTotalHistory = this.getUserTotalHistory.bind(this);
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
      activePlan: plan,
      overviewToggle: true,
      formToggle: false
    })
  }

  submitBasic(info) {
    axios.post('/retire/plans', info
    ).then(res => {
      this.updatePlans()
    }).catch(err => {console.log(err)})
    console.log('Trying to submit');
  }

  updateItems() {
    axios.get('/retire/items',{ params: {userId: this.props.userData.userId } })
         .then(({data}) => {
           this.setState({
           items: data
           })
           data.forEach((item) => {
             this.updateAccounts(item);
           });
         })
         .catch((err) => {
           console.log(err);
         })
  }

  launchPlaidLink() {
    this.handler.open();
  }

  updatePlans() {
    axios.get('/retire/plans', { params: {userId: this.props.userData.userId } })
      .then(({data}) => {
        this.setState({
          plans: data,
          activePlan: data[0]
        })
        if(!this.state.plans && this.state.plans.length === 0) {
          this.setState({ formToggle: true})
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateGoals() {
    axios.get('retire/goals', { params:{ userId:this.props.userData.userId }})
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

  updateAccounts(item) {
    axios.get('retire/accounts', { params: { itemId: item.itemId }})
      .then(({data}) => {
        let currentAccounts = Object.assign({}, this.state.accounts);
        data.accounts.forEach((account) => {
          currentAccounts.accountList.push(Object.assign(account, data.item, {institutionName: item.institutionName}));
          currentAccounts.userTotal.currentTotal += account.balances.current;
          currentAccounts.userTotal.currentAvailable += account.balances.available;
        });
        this.setState({
          accounts: currentAccounts
        });
        this.getUserTotalHistory()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserTotalHistory(currentBalance, currentAvailable) {
    axios.put('retire/history', {
      userId: this.props.userData.userId,
      currentBalance: currentBalance,
      currentAvailable: currentAvailable
    })
      .then(({data}) => {
        let newAccounts = Object.assign({}, this.state.accounts);
        newAccounts.userTotal.history = data;
        this.setState({
          accounts: newAccounts
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    // Plaid app needs to initialize it's "Link" feature through which accounts can be added. https://plaid.com/docs/#integrating-with-link
    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '2dec9b90cfcc7a2d76b295ac1b3504',
      onSuccess: (public_token, metadata) => {   // Defining what should happen upon success of the Plaid 'Link' feature, at minimum, send public_token to our server.
        axios.post('/retire/get_access_token', {
          public_token: public_token,
          metadata: metadata,
          userId: this.props.currentUserId
        })
        .then(() => {
          console.log('Post Successful');
          this.updateItems();
        })
        .catch((err) => {
          console.log('Plaid didnt work!' + err);
        })
      },
    });

    if (this.props.userData.userId) {
      this.updatePlans();
      this.updateGoals();
      this.updateItems();
    }

  }



  render() {
    return (
      <div className="row">

        <div className="col-md-2">
          <SideRail
            activePlan={this.state.activePlan}
            user={this.props.user} 
            currentUserId={this.props.userData && this.props.userData.userId} 
            plans={this.state.plans} 
            createPlan={this.createPlan} 
            editPlanName={this.editPlanName} 
            deletePlan={this.deletePlan} 
            setActivePlan={this.setActivePlan}
            setOverview={this.setOverview} 
            goals={this.state.goals} 
            launchPlaidLink={this.launchPlaidLink}
          />
        </div>

          {this.state.formToggle && 
          <span>
          <div className="col-md-auto mb-4">
          <BasicInfo submitBasic={this.submitBasic} user={this.props.userData} />
          </div>
          <div className="col-md-auto mb-4">
          <GoalInfo user={this.props.userData} />
          </div>
          </span>}


            <div className="col-md-6">
              {(this.state.overviewToggle && this.state.activePlan) && <Overview accounts={this.state.accounts} activePlan={this.state.activePlan} plans={this.state.plans} goals={this.state.goals}/>}
            </div>
            {/* {this.state.accountToggle && <Accounts user={this.props.user} currentUserId={this.props.currentUserId}/>} */}
            <div className="col-md-4">{(this.state.accountToggle && this.state.overviewToggle) && <Accounts user={this.props.user} 
            currentUserId={this.props.currentUserId}
            launchPlaidLink={this.launchPlaidLink}
            accounts={this.state.accounts}
  />}
                    
          </div>
</div>
    );
  }

}

export default Dashboard;