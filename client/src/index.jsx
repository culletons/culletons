import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LineChart from './components/dashboard/LineChart.jsx'
import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Nav from './components/header/Nav.jsx';
import firebase from 'firebase';
import Rebase from 're-base';

const config = {
  apiKey: "AIzaSyAEzRpVoxoH3JYhRYLZLSz17HAwA7D8cXA",
  authDomain: "retirement-plan-b108e.firebaseapp.com",
  databaseURL: "https://retirement-plan-b108e.firebaseio.com",
  projectId: "retirement-plan-b108e",
  storageBucket: "retirement-plan-b108e.appspot.com",
  messagingSenderId: "279041770365"
  };

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }

    this.onLogin = this.onLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.oAuthLogin = this.oAuthLogin.bind(this);
    this.oAuthSignUp = this.oAuthSignUp.bind(this);
    this.onGetStarted = this.onGetStarted.bind(this);
  } 

  //for OAuth login
  oAuthLogin (provider) {
    firebase.auth().signInWithPopup(provider)
      .then((authData) => {
        axios.get('/retire/login', { oAuthToken: authData.credential.accessToken })
        .then(() => {
          this.setState({
            isLoggedIn: true
          })
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err));
  }
  
  //for local login
  onLogin (userName, passWord) {
    axios.post('/retire/login', { username: userName, password: passWord })
    .then(() => {
      this.setState({
        isLoggedIn: true
      })
    .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  }
  
  //for local signup
  signUp(username, password, fullname, email) {
    axios.post('/retire/users', { username: username, password: password, fullname: fullname, email: email })
    .then(() => {
      this.setState({
        isLoggedIn: true
      })
    .catch((err) => console.error(err))
    })
    .catch((err) => {console.error(err)})
  }

  //for OAuth signup
  oAuthSignUp (provider) {
    firebase.auth().signInWithPopup(provider)
      .then((authData) => {
        console.log(authData)
        axios.post('/retire/users', { 
          fullname: authData.additionalUserInfo.profile.name, 
          email: authData.additionalUserInfo.profile.email, 
          providerId: authData.additionalUserInfo.providerId, 
          oAuthId: authData.additionalUserInfo.profile.id })
        .then(() => {
          this.setState({
            isLoggedIn: true
          })
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err));
    }
    
  onGetStarted() {
    this.setState({
      isLoggedIn: true
    })
  }
  
  logOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        isLoggedIn: false
      })
    }).catch(function(error) {
      console.error(error)
    });
  }

  render() {
    const options = {
      title: {
        text: 'Retirement at a glance',
      },
      xAxis: {
        tickInterval: 5,
        labels: {
          enabled: true
        }
      },
      yAxis: {
        title: {
          text: '$ thousand',
        },
      },
      chart: {
        type: 'line',
      },
      series: [
        {
          name: 'Jane',
          data: [1, 0, 4, 0, 3],
        },
        {
          name: 'John',
          data: [5, 7, 3, 2, 4],
        },
        {
          name: 'Doe',
          data: [0, 0, 0, 1, 0],
        },
      ],
    };

    return (
      <div className="container-fluid">
        <div id="cont"></div>
        <Nav onGetStarted={this.onGetStarted} onLogin={this.onLogin} onSignUp={this.signUp} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}  authenticate={this.oAuthLogin}/>
        {this.state.isLoggedIn && <Dashboard/>}
        {!this.state.isLoggedIn && <Home onSignUp={this.signUp} authenticate={this.oAuthSignUp}/>}
        <LineChart options={options} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
