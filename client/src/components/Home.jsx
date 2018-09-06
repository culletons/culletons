import React from 'react';
import Signup from './header/Signup.jsx'

const Home = (props) => (
  <div>
    <br/>
    <br/>
    <div className="jumbotron jumbotron-fluid" id="home-jumbo">
      <div className="container">
        <h1 className="display-4">Culletons Planner</h1>
        <p className="lead">Kenni, come up with a motto.</p>
        <Signup onSignUp={props.onSignUp} authenticate={props.authenticate}/>
      </div>
    </div>
    <div className="card-deck">
      <div className="card">
        <div className="card-body">
          Hi
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          Bootstrap 
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          Is Easy
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md=12" >
        This page is pretty much completely static, but you might be easily convinced that it was hard to build!
      </div>
    </div>
  </div>
)

export default Home;