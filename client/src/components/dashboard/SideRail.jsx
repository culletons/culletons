import React from 'react';
import axios from 'axios'

class SideRail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editValue: '',
    }
    this.confirmDelete = this.confirmDelete.bind(this)
    this.saveName = this.saveName.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.launchPlaidLink = this.launchPlaidLink.bind(this);
  }


  confirmDelete(id) {
    this.props.deletePlan(id)
  }

  saveName(name, id) {
    this.props.editPlanName(name, id)
  }

  onEdit(e) {
    this.setState({ editValue: e.target.value})
  }

  shouldComponentUpdate(nextProp, nextState) {
    return true
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.plans !== prevProps.plans) {
  //     this.forceUpdate()
  //   }
  // }

  componentDidMount() {

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
            <h3 className="card-title">Welcome {this.props.userData && this.props.userData.fullname}</h3>
            <button id="link-btn" className="btn btn-success" onClick={this.launchPlaidLink}>Link Account</button>
            <br /></div>
          <div className="card-body border-bottom">
            <a onClick={this.props.setOverview} >Home &nbsp;<i className="fa fa-home fa-fw" aria-hidden="true"></i></a>
          </div>
          <div className="card-body border-bottom">
            {this.props.plans && this.props.plans.map((plan, idx) => (
              <div key={idx} className="panel-default">
                <div className="panel-heading">
                  <h6 className="panel-title" data-toggle="collapse" onClick={() => this.props.setActivePlan(plan)} data-target={`#collapseExample${idx}`} aria-expanded="false" aria-controls="collapseExample">{plan.name || 'Plan name'}
                  {/* <h6 className="panel-title" data-toggle="collapse" onClick={() => this.props.setActivePlan(plan)} data-target={`#collapseExample${idx}`} aria-expanded="false" aria-controls="collapseExample">Plan name */}
                  </h6>
                  <a data-toggle="modal" data-target="#editModal" className="btn btn-default" aria-label="Settings">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                    <a data-toggle="modal" data-target="#deleteModal" className="btn btn-default" aria-label="Delete">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="panel-body collapse" id={`collapseExample${idx}`} >
                  <div>Current savings: {plan.currentSavings}</div>
                  <div>Monthly savings: {plan.monthlySavings}</div>
                  <div>Retirement age: {plan.retirementAge}</div>
                </div>

<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit plan name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                      Rename your plan: <input value={this.state.editValue} onChange={this.onEdit}></input>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Discard</button>
                        <button type="button" data-dismiss="modal" onClick={() => this.saveName(this.state.editValue, plan.planId)} className="btn btn-success">Save</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Please confirm that you wish to delete this plan.
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" data-dismiss="modal" onClick={() => this.confirmDelete(plan.planId)} className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-body">
            <button className="btn btn-primary" type="submit" onClick={this.props.createPlan}>+</button> New plan
        </div>

        </div>
      </div>
    );
  }

}

export default SideRail;