import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from './components/Home.jsx';
import Nav from './components/Nav.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <Nav/>
        <Home/> {/*RENDER HOME IF USER HAS LOGGED IN*/}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));