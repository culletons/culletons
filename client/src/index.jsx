import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LineChart from './components/dashboard/LineChart.jsx'
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
    this.onGetStarted = this.onGetStarted.bind(this);
  } 

  onLogin (userName, passWord) {
    axios.post('/auth/login', {
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

  onGetStarted() {
    this.setState({
      isLoggedIn: true
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
      <div>
                
        <div id="cont"></div>
        <Nav onGetStarted={this.onGetStarted} onLogin={this.onLogin} onSignUp={this.signUp} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}/>
        {this.state.isLoggedIn && <Dashboard/>}
        {!this.state.isLoggedIn && <Home onSignUp={this.signUp}/>}
        <LineChart options={options} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
