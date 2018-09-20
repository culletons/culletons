import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Nav from './components/header/Nav.jsx';
import firebase from 'firebase/app';
import 'firebase/auth';
import config from './config/googleKey.js';

// create firebase config.js file inside components/header/googleKey.js
const app = firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      isLoggedIn: false,
      userData: null,
      currentUserId: 0
    }

    this.checkifUserExistsinUserTable = this.checkifUserExistsinUserTable.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this); 
    this.onGetStarted = this.onGetStarted.bind(this);
    this.logOut = this.logOut.bind(this);
  } 

  componentDidMount() {
    this.getUserInfo();
  }

  checkifUserExistsinUserTable(idToken){
    return axios.get('/retire/users', { params: { idToken: idToken } })
    .then(({ data }) => {
      this.setState({
        isLoggedIn: true,
        userData: data
      })
    })
  }

  updateUserState(idToken, name, username, email){
    this.setState({
      isLoggedIn: true,
      userData: {
        userId: idToken,
        username: username,
        fullname: name,
        email: email
      }
    })
  }

  getUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(true)
          .then((idToken) => {
            this.checkifUserExistsinUserTable(idToken)
              .catch((err) => {
                console.log(err);
              });
          }).catch((error) => {
            console.log(error);
          });
      } else {
        console.log("No user is logged in");
      }
    });
  }
  
  // allow people to use the website without signing up
  onGetStarted() {
    this.setState({
      isLoggedIn: true,
      userData: {userId: 3}
    })
  }
  
  logOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        isLoggedIn: false,
        userData: null
      })
    }).catch((error) => {
      console.error(error)
    });
  }

  render() {
    return (
      <div>
        <Nav 
          onGetStarted={this.onGetStarted}
          updateUserState={this.updateUserState}
          logOut={this.logOut}
          isLoggedIn={this.state.isLoggedIn}
          userData={this.state.userData}
        />
        {!this.state.isLoggedIn && <Home updateUserState={this.updateUserState} />}
      <div className="container-fluid">
        <div id="cont"></div>
        {this.state.isLoggedIn && <Dashboard userData={this.state.userData} />}
      </div>
        <footer className="section footer-dk">
        {/* a basic footer that doesn't feature anything as of yet */}
          <div>
          <div className="container">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-2 text-center p-4">
                  <h2>Plan+Life</h2>
                  <h4>
                    WOO
                   </h4>
                </div>
                <div className="col-sm-6 text-center p-4">
                <h4>Contact us: never</h4>
                </div>
              </div>
            </div>
          </div>
        </ footer>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
