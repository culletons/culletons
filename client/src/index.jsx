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
      isLoggedIn: false
    }

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  logIn() {
    this.setState({
      isLoggedIn: true
    })
  }

  signUp() {

  }
  
  logOut() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    let page;
    if (this.state.isLoggedIn) {
      page = <Dashboard />;
    } else {
      page = <Home logIn={this.logIn}/>;
    }


    return (
      <div className="container-fluid">
        { page }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));