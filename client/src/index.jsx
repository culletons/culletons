import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LineChart from './components/dashboard/LineChart.jsx'
import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Nav from './components/header/Nav.jsx';
import firebase from 'firebase';
import Rebase from 're-base';
import config from './components/header/googleKey.js'

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      isLoggedIn: false,
      userData: { fullname: 'culleton', userId: 1},
      currentUserId: 0

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
        axios.get('/retire/login', { oAuthId: authData.additionalUserInfo.profile.id })
        .then((user) => {
          this.setState({
            isLoggedIn: true,
            userData: authData,
            currentUserId: user.data[0]
          })
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err));
  }
  
  //for local login
  onLogin (userName, passWord) {
    // axios.get('/retire/users', {
    //   params: {username: userName, password: passWord }})
    // .then((res) => {
    //   this.setState({
    //     // user: res.data.user,
    //   })
    // }).catch(err => console.log(err))

    axios.post('/retire/login', { username: userName, password: passWord })
    .then((user) => {
      this.setState({
        isLoggedIn: true,
        currentUserId: user.data[0]
      })
    })
    .catch((err) => console.error(err))
  }
  
  //for local signup
  signUp(username, password, fullname, email) {
    axios.post('/retire/users', { username: username, password: password, fullname: fullname, email: email })
    .then((user) => {
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
        axios.post('/retire/users', { 
          fullname: authData.additionalUserInfo.profile.name, 
          email: authData.additionalUserInfo.profile.email, 
          providerId: authData.additionalUserInfo.providerId, 
          oAuthId: authData.additionalUserInfo.profile.id 
        })
        .then((user) => {
          this.setState({
            currentUserId: user.data.userId,
            userData: authData,
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

    return (
      <div className="container-fluid">
        <div id="cont"></div>
        <Nav onGetStarted={this.onGetStarted} onLogin={this.onLogin} onSignUp={this.signUp} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}  authenticate={this.oAuthLogin}/>
        {this.state.isLoggedIn && <Dashboard user={this.state.userData} currentUserId={this.state.currentUserId}/>}
        {!this.state.isLoggedIn && <Home onSignUp={this.signUp} authenticate={this.oAuthSignUp}/>}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
