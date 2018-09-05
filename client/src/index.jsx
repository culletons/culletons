import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Nav from './components/header/Nav.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      isLoggedIn: false
    }
    this.onLogin = this.onLogin.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
  } 

  onLogin (userName, passWord) {
    axios.post('./retired/login', {
      params: {
        username: userName,
        password: passWord
      }
    })
    .then(() => {
      this.setState({
        isLoggedIn: true
      })
    })
    .catch((err) => {
      this.setState({
        isLoggedIn: true
      })
    })
  }

  signUp(userName, passWord) {
    axios.post('./retired/users', {
      params: {
        username: userName,
        password: passWord
      }
    })
    .then(() => {})
    .catch(() => {})
  }
  
  logOut() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Nav onLogin={this.onLogin} onSignUp={this.signUp} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}/>
        {this.state.isLoggedIn && <Dashboard/>}
        {!this.state.isLoggedIn && <Home onSignUp={this.signUp}/>}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));