import React from 'react';
import axios from 'axios'

import BasicInfo from './BasicInfo.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      plan: [{ currentSavings: 20000}]
    }
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

  }

  render() {
    return (


      <div className="card side-rail">
          <h3 className="card-title">Your Profile:</h3>
        <div className="card-body">
          <br/>



<div className = "panel panel-primary">
   <div className = "panel-heading">
      <h3 className = "panel-title">Plan name</h3>
   </div>
   
   <div className = "panel-body">
      Current savings: {this.state.plan.currentSavings}
   </div>
</div>

<button className="btn btn-primary" type="submit">+</button> Add a new plan
 {/* <ul className="list-group">
  <li className="list-group-item">Basic Info</li>
  <li className="list-group-item">Monthly Budget</li>
  <li className="list-group-item">..</li>
  <li className="list-group-item">..</li>
</ul>  */}

          
         </div>
      </div>
    );
  }

}

export default Dashboard;