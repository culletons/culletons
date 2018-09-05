import React from 'react';

import Login from './Login.jsx';
import Signup from './Signup.jsx';

const Nav = function () {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-toggle collapsed">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#"><h3>WebSiteName</h3></a>
          </div>
            <Login/>
            <Signup/>
          </div>
      </nav>
    </div>
  )
}

export default Nav;