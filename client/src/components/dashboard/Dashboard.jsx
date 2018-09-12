import React from 'react';
import axios from 'axios';
import Accounts from './Accounts.jsx'
import BasicInfo from './BasicInfo.jsx';
import SideRail from './SideRail.jsx';
import GoalInfo from './goalInfo.jsx';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // todo add state for designated main plan, allow user to set main plan
      plans: [{ currentSavings: 0 }],
      goals: null,
      formBasicToggle: true,
      formGoalsToggle: true,
      overviewToggle: false,
      items: [],
      accounts: {
        userTotal: {
          currentTotal: 0,
          currentAvailable: 0,
          history: {}
        }
      }
    }
    this.onAddPlan = this.onAddPlan.bind(this)
    this.updatePlans = this.updatePlans.bind(this);
    this.launchPlaidLink = this.launchPlaidLink.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.getUserTotalHistory = this.getUserTotalHistory.bind(this);
  }

  onAddPlan() {
    // render form
    this.setState({ formBasicToggle: true})
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

  updateGoals() {
    axios.get('retire/goals', { params:{ userId:this.props.userData.userId }})
    .then(({data}) => {
      this.setState({goals: data})
      if (this.state.goals) {
        this.setState({ formGoalsToggle: false })
      }
    })
    .catch((err) => console.log(err));
  }

  updateAccounts(item) {
    axios.get('retire/accounts', { params: { itemId: item.itemId }})
      .then(({data}) => {
        let currentAccounts = Object.assign({}, this.state.accounts);
        data.accounts.forEach((account) => {
          currentAccounts[account.name] = Object.assign(account, data.item, {institutionName: item.institutionName});
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
        console.log(data);
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

    // axios.get('retire/plans', {
    //   params: {
    //     userId: this.props.user && this.props.user.userId
    //   }
    // }).then(res => {
    //   this.setState({
    //     plans: res.data
    //   })
    // }).catch(err => {console.log(err)})
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
            <SideRail user={this.props.user} currentUserId={this.props.userData && this.props.userData.userId} plans={this.state.plans} goals={this.state.goals}/>
          </div>
          {/* only render if user has no plan yet or if addPlan is clicked */}
          <div className="col-md-9">
            {this.state.overviewToggle && <Overview plans={this.state.plans} />}
            {this.state.formBasicToggle && <BasicInfo user={this.props.userData} />}
            {this.state.formGoalsToggle && <GoalInfo user={this.props.userData}/>}
            <Accounts items={this.state.items}/>
          </div>
        </div>
    );
  }

}

export default Dashboard;