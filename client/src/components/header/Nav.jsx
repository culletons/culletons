import React from 'react';

import Login from './Login.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.logOut();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-toggle collapsed ">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><h3>Culletons</h3></a>
            </div>
            <div className="nav-item">
              <a className="nav-link active" onClick={this.props.onGetStarted} href="#">Get started!</a>
             </div>
            <div className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="#">Resources</a>
            </div>
              {!this.props.isLoggedIn && <Login onLogin={this.props.onLogin} authenticate={this.props.authenticate}/>}
              {this.props.isLoggedIn && <button className="btn btn-outline-success mb-4" onClick={this.clickHandler}>Logout</button>}
            </div>
        </nav>
      </div>
    )
  } 
}

export default Nav;