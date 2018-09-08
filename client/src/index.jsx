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
      isLoggedIn: false,
      userData: null
    }

    this.possibleToMount = true;

    this.onLogin = this.onLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.oAuthLogin = this.oAuthLogin.bind(this);
    this.oAuthSignUp = this.oAuthSignUp.bind(this);
    this.onGetStarted = this.onGetStarted.bind(this);
    this.signUp = this.signUp.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  } 

  componentDidMount() {
    if(this.possibleToMount === true) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(true)
                .then((idToken) => {
                  axios.get('/retire/users', {params: {idToken: idToken }})
                       .then(({data}) => {
                         this.setState({
                           isLoggedIn: true,
                           userData: data
                         })
                       })
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

  //for local signup
  signUp(username, password, fullname, email) {
    this.possibleToMount = false;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken(true)
                .then((idToken) => {
                  axios.post('/retire/users', {idToken: idToken, fullname: fullname, email: email, username: username })
                        .then(({data}) => {
                          this.setState({
                            isLoggedIn: true,
                            userData: {
                              userId: data,
                              username: username,
                              fullname: fullname,
                              email: email
                            }
                          })
                          this.possibleToMount = true;
                        })
                        .catch((err) => {console.error(err)})
                })
                .catch((err) => {
                  console.log(err);
                })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //for OAuth signup
  oAuthSignUp (provider) {
    firebase.auth().signInWithPopup(provider)
      .then((authData) => {
        firebase.auth().currentUser.getIdToken(true)
                .then((idToken) => {
                  axios.post('/retire/users', { 
                    fullname: authData.additionalUserInfo.profile.name, 
                    email: authData.additionalUserInfo.profile.email, 
                    username: authData.additionalUserInfo.username, 
                    idToken: idToken
                  })
                  .then((user) => {
                  })
                  .catch((err) => console.error(err))
                })
      })
      .catch((err) => console.error(err));
    }

  //for OAuth login
  oAuthLogin (provider) {
    firebase.auth().signInWithPopup(provider)
      .then((authData) => {
        console.log('signed in');
      })
      .catch((err) => console.error(err));
  }
  
  //for local login
  onLogin (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((authData) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
    
  onGetStarted() {
    this.setState({
      isLoggedIn: true
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
        <Nav 
          onGetStarted={this.onGetStarted} 
          onLogin={this.onLogin} 
          oAuthLogin={this.oAuthLogin} 
          isLoggedIn={this.state.isLoggedIn} 
          logOut={this.logOut}  
          emailAndPassSignUp={this.signUp} 
          googleSignUp={this.oAuthSignUp}
          userData={this.state.userData}
        />
        {this.state.isLoggedIn && <Dashboard userData={this.state.userData} />}
        {!this.state.isLoggedIn && <Home onSignUp={this.signUp} emailAndPassSignUp={this.signUp} googleSignUp={this.oAuthSignUp}/>}
        <LineChart options={options} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
