import React from 'react';
import axios from 'axios'
import BasicInfo from './BasicInfo.jsx';

class SideRail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }

    this.launchPlaidLink = this.launchPlaidLink.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   user: this.props.user
    // })

    // axios.get('/plans', {
    //   params: {
    //     userId: this.props.user.userId
    //   }
    // }).then((res) => {
    //   this.setState({
    //     plan: res.data
    //   })
    // }).catch((err) => {console.error(err)})
  }


  onClickAddPlan() {

    // Plaid app needs to initialize it's "Link" feature through which accounts can be added. https://plaid.com/docs/#integrating-with-link
    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '2dec9b90cfcc7a2d76b295ac1b3504',
      onSuccess: function(public_token, metadata) {   // Defining what should happen upon success of the Plaid 'Link' feature, at minimum, send public_token to our server.
        console.log("HEY THIS IS THE RESPONSE FROM PLAID: " + public_token);
        axios.post('/retire/get_access_token', {
         
            public_token: public_token,
            metadata: metadata
          
        })
        .then(() => {
          // HERE WE MANIPULATE STATE TO SHOW THAT IT WAS SUCCESSFUL
        })
        .catch((err) => {
          console.log('Plaid didnt work!' + err);
        })
      },
    });
  }

  launchPlaidLink() {
    this.handler.open();
  }

  render() {
    return (
      <div className="card side-rail">
        <div className="card-block">
        <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkYg7YWw9mG3zsEI5lCHeTz30oLSjMXXxm5irxjnGTj5deUKOPA" />
          <div className="card-body border-bottom">
            <h3 className="card-title">Welcome {this.props.user.fullname}</h3>
            <button id="link-btn" className="btn btn-success" onClick={this.launchPlaidLink}>Link Account</button>
            <br/></div>
            <div className="card-body border-bottom">

            { this.props.plans.map((plan) => (

            <div key={plan.planId} className="panel-default">
              <div className="panel-heading">
                <h3 className="panel-title" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Plan name<button type="button panel" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button></h3>

                {/* todo create pop-up asking for delete confirmation */}
              </div>
              <div className="panel-body collapse" id="collapseExample" >
                <div>Current savings: {plan.currentSavings}</div>
                <div>Monthly savings: {plan.monthlySavings}</div>
                <div>Retirement age: {plan.retireAge}</div>
              </div>
            </div>
              
            ))}




          </div>
          <div className="card-body">
            <button className="btn btn-primary" type="submit" onClick={this.props.onAddPlan}>+</button> New plan
        </div>
        </div>
      </div>
    );
  }

}

export default SideRail;