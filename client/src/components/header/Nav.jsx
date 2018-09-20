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
              <a className="navbar-brand" href=""><h3>Plan+Life</h3></a>
            </div>
            <div className="nav-item">
              <a className="nav-link active" onClick={this.props.onGetStarted} href="#">Get started!</a>
             </div>
            <div className="nav-item">
              {/* NOT IMPLEMENTED: Create a new component that would give basic information about the app */}
              <a className="nav-link" href="#">About Us</a>
            </div>
            <div className="nav-item">
              {/* NOT IMPLEMENTED: Create a new component that would give additional resources about retirement to the user. */}
              <a className="nav-link" href="#">Resources</a>
            </div>
            <div className="nav-item">
              <p className="nav-item">{this.props.userData && "Welcome " +this.props.userData.fullname}</p>
            </div>
            {!this.props.isLoggedIn && <Login updateUserState={this.props.updateUserState} />}
            {this.props.isLoggedIn && <div className="nav-item"><a className="loginbtn mb-4" id="auth-btn" onClick={this.clickHandler}>Logout</a></div>}
            </div>
        </nav>
      </div>
    )
  } 
}

export default Nav;