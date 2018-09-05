import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from './components/Home.jsx';
import Nav from './components/header/Nav.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ""
    }
    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);
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
        
      })
    })
    .catch((err) => console.error(err))
  }

  onSignup () {

  }

  render() {
    return (
      <div>
        <Nav onLogin={this.onLogin}/>
        {/* <Home/> RENDER HOME IF USER HAS LOGGED IN */}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));