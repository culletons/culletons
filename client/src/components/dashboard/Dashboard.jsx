import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx';
import SideRail from './SideRail.jsx';
import Overview from './Overview.jsx';
import GoalInfo from './goalInfo.jsx';
import BasicInfo from './BasicInfo.jsx';
import LineChart from '../charts/LineChart.jsx';
import SavingsHistChart from '../charts/SavingsHistChart.jsx';

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
      retirePlan: {}
    };
    this.createPlan = this.createPlan.bind(this);
    this.updatePlans = this.updatePlans.bind(this);
    this.launchPlaidLink = this.launchPlaidLink.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.getUserTotalHistory = this.getUserTotalHistory.bind(this);
    this.setActivePlan = this.setActivePlan.bind(this);
    this.setOverview = this.setOverview.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.editPlanName = this.editPlanName.bind(this);
    this.submitBasic = this.submitBasic.bind(this);
    this.calculateRetirePlan = this.calculateRetirePlan.bind(this);
  }

  createPlan() {
    this.setState({
      formToggle: true,
      overviewToggle: false,
      accountToggle: false
    });
  }

  deletePlan(id) {
    axios
      .delete('/retire/plans', {
        params: { planId: id }
      })
      .then((res) => {
        this.updatePlans();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editPlanName(name, id) {
    axios
      .put('/retire/plans', { name: name, planId: id })
      .then((res) => {
        this.updatePlans();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setActivePlan(plan) {
    // when you click on a plan in the siderail, it sets it to active
    this.setState({
      activePlan: plan,
      overviewToggle: true,
      formToggle: false
    });
    this.calculateRetirePlan();
  }

  submitBasic(info) {
    axios
      .post('/retire/plans', info)
      .then((res) => {
        this.updatePlans();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Trying to submit');
  }

  updateItems() {
    axios
      .get('/retire/items', { params: { userId: this.props.userData.userId } })
      .then(({ data }) => {
        this.setState({
          items: data
        });
        data.forEach((item) => {
          this.updateAccounts(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  launchPlaidLink() {
    this.handler.open();
  }

  updatePlans() {
    axios
      .get('/retire/plans', { params: { userId: this.props.userData.userId } })
      .then(({ data }) => {
        console.log('this is the plan data: ', data);
        this.setState({
          plans: data,
          // default the active plan as the first one. could later allow users to manually set their "main" plan
          activePlan: data[0]
        });
        // if the user has plans, just render user's overview
        if (this.state.plans && this.state.plans.length > 0) {
          this.setState({
            formToggle: false,
            overviewToggle: true
          });
          this.calculateRetirePlan();
        } else {
          // if user has none, show them the forms to create a plan
          this.setState({
            formToggle: true,
            overviewToggle: false
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateGoals() {
    axios
      .get('retire/goals', { params: { userId: this.props.userData.userId } })
      .then(({ data }) => {
        this.setState({ goals: data });
        if (this.state.goals) {
          this.setState({ formGoalsToggle: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setOverview() {
    //toggle on the overview and disable form view
    this.setState({
      overviewToggle: true,
      formToggle: false
    });
  }

  updateAccounts(item) {
    axios
      .get('retire/accounts', { params: { itemId: item.itemId } })
      .then(({ data }) => {
        let currentAccounts = Object.assign({}, this.state.accounts);
        data.accounts.forEach((account) => {
          currentAccounts.accountList.push(
            Object.assign(account, data.item, { institutionName: item.institutionName })
          );
          currentAccounts.userTotal.currentTotal += account.balances.current;
          currentAccounts.userTotal.currentAvailable += account.balances.available;
        });
        this.setState({
          accounts: currentAccounts
        });
        this.getUserTotalHistory();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserTotalHistory(currentBalance, currentAvailable) {
    axios
      .put('retire/history', {
        userId: this.props.userData.userId,
        currentBalance: currentBalance,
        currentAvailable: currentAvailable
      })
      .then(({ data }) => {
        let newAccounts = Object.assign({}, this.state.accounts);
        newAccounts.userTotal.history = data;
        this.setState({
          accounts: newAccounts
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // think we can move this to node pretty cleanly, setState in .then()
  calculateRetirePlan() {
    axios
      .get('/retire/trajectory', { params: { activePlan: this.state.activePlan } })
      .then((result) => {
        console.log(result.data);
        this.setState({
          retirePlan: result.data
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    // Plaid app needs to initialize it's "Link" feature through which accounts can be added. https://plaid.com/docs/#integrating-with-link
    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '2dec9b90cfcc7a2d76b295ac1b3504',
      onSuccess: (public_token, metadata) => {
        // Defining what should happen upon success of the Plaid 'Link' feature, at minimum, send public_token to our server.
        axios
          .post('/retire/get_access_token', {
            public_token: public_token,
            metadata: metadata,
            userId: this.props.userData.userId
          })
          .then(() => {
            console.log('Post Successful');
            this.updateItems();
          })
          .catch((err) => {
            console.log('Plaid didnt work!' + err);
          });
      }
    });
    // pull all of the user's data from our database once the userdata is received
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
            updatePlans={this.updatePlans}
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
        <div className="col-md-10">
          {/* render forms when toggle is true. atm this only happens if user has no plans or if they click add plan */}
          {this.state.formToggle && (
            <div className="col-md-12">
              {/* two different forms for the user to fill out */}
              <BasicInfo submitBasic={this.submitBasic} user={this.props.userData} />
              {/* <GoalInfo user={this.props.userData} /> */}
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              {/* linechart is part of the overview as well. holds retirement projection */}
              {this.state.overviewToggle &&
                this.state.activePlan && (
                  <LineChart
                    activePlan={this.state.activePlan}
                    retirePlan={this.state.retirePlan}
                    goals={this.state.goals}
                  />
                )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-7">
              {/* overview is the user's splash page that shows all of the current active plans and accompanying charts, accounts */}
              {this.state.overviewToggle &&
                this.state.activePlan && (
                  <Overview
                    accounts={this.state.accounts}
                    updatePlans={this.state.updatePlans}
                    activePlan={this.state.activePlan}
                    plans={this.state.plans}
                    goals={this.state.goals}
                  />
                )}
            </div>
            <div className="col-md-5">
              {this.state.accountToggle && (
                <Accounts
                  user={this.props.user}
                  currentUserId={this.props.currentUserId}
                  launchPlaidLink={this.launchPlaidLink}
                  accounts={this.state.accounts}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
