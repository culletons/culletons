import React from 'react';

class SideRail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (

      <div className="card side-rail">
        <div className="card-body">
          <h3 className="card-title">Your Profile:</h3>
          <br/>
          <ul className="list-group">
            <li className="list-group-item">Basic Info</li>
            <li className="list-group-item">Monthly Budget</li>
            <li className="list-group-item">..</li>
            <li className="list-group-item">..</li>
          </ul>
          <h3 className="card-title">Your Plans:</h3>
          <ul>
            { this.props.plans && this.props.plans.map((plan) => (
              <li key={plan.planId}>Plan to Retire at {plan.retirementAge}</li>
            ))}
          </ul>
          
        </div>
     </div>
    );
  }

}

export default SideRail;