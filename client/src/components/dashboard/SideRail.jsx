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

  launchPlaidLink() {
    this.handler.open();
  }

  render() {
    return (
      <div className="card side-rail">
        <div className="card-block">
          <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkYg7YWw9mG3zsEI5lCHeTz30oLSjMXXxm5irxjnGTj5deUKOPA" />
          <div className="card-body border-bottom">
            <h5 className="card-title">Welcome {this.props.userData && this.props.userData.fullname}</h5>
            <button id="link-btn" className="btn theme-btn" onClick={this.props.launchPlaidLink}>Link Account</button>
            <br /></div>
          <div className="card-body border-bottom theme-hover" onClick={this.props.setOverview}>
            <i className="fa fa-home fa-fw" aria-hidden="true"></i><a  >&nbsp;Home</a>
          </div>
          <div className="card-body border-bottom">
            <i className="fa fa-list-alt " aria-hidden="true"></i><a >&nbsp; Plans </a>
          </div>
          {this.props.plans && this.props.plans.map((plan, idx) => (
            <div className="card-body border-bottom py-1">
              <div key={idx} className="panel-default">
                <div className="panel-heading">
                  <h6 className="panel-title theme-hover" data-toggle="collapse" onClick={() => this.props.setActivePlan(plan)} data-target={`#collapseExample${idx}`} aria-expanded="false" aria-controls="collapseExample">
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                    &nbsp; {plan.name || 'Plan'}
                  </h6>
                  <span className="dropdown align-right">
                    <a className="dropdown-toggle float-right" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-ellipsis-v " aria-hidden="true"></i>
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a className="dropdown-item" data-toggle="modal" data-target="#editModal" aria-label="Edit name" href="#">Edit name</a>
                      <a className="dropdown-item" data-toggle="modal" data-target="#deleteModal" aria-label="Delete" href="#">Delete plan</a>
                    </div>
                  </span>

                </div>
                <div className="panel-body collapse" id={`collapseExample${idx}`} >
                  <div>Created: {plan['created_at'].slice(0, 10)}</div>
                  <div>Current savings: ${plan.currentSavings.toLocaleString()}</div>
                  <div>Monthly savings: ${plan.monthlySavings.toLocaleString()}</div>
                  <div>Retire by {plan.retirementAge}</div>
                  <br></br>
                </div>
               
              </div>
            </div>
          )
          )}
          {/* End map */}
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
                        <button type="button" data-dismiss="modal" onClick={() => this.saveName(this.state.editValue, this.props.activePlan.planId)} className="btn btn-success">Save</button>
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
                        <button type="button" data-dismiss="modal" onClick={(e) => this.confirmDelete(this.props.activePlan.planId)} className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
          <div className="card-body border-bottom theme-hover" onClick={this.props.createPlan}>
          <a ><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; Add new plan </a>
          </div>
        </div>
      </div>
    );
  }

}

export default SideRail;