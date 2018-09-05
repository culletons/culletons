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
    this.onSignup = this.onSignup.bind(this);
    this.logOut = this.logOut.bind(this);
  } 

  onLogin (userName, passWord) {
    axios.post('/login', {
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
    .catch((err) => console.error(err))
  }

  signUp() {

  }
  
  logOut() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Nav onLogin={this.onLogin}/>
        {this.state.isLoggedIn && <Dashboard />}
        {!this.state.isLoggedIn && <Home logIn={this.logIn} />}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
