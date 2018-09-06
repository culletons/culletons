import React from 'react';
import Signup from './header/Signup.jsx'

const Home = (props) => (
  <div>
    <div className="jumbotron jumbotron-fluid" id="home-jumbo">
      <div className="container">
        <h1 className="display-4">Culletons Planner</h1>
        <p className="lead">Kenni, come up with a motto.</p>
        <Signup onSignUp={props.onSignUp}/>
      </div>
    </div>
    <div className="container-fluid">
    <div className="card-deck">
      <div className="card">
      <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87XTXx8HmTPqdOQ_xeEf_Kp2vO2zflrfCAG_Fpb9MKGWBVry02Q" / >
        <div className="card-body">
        <h5 className="card-title">Financial Planning</h5>
        Hi
        </div>
      </div>
      <div className="card">
      <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87XTXx8HmTPqdOQ_xeEf_Kp2vO2zflrfCAG_Fpb9MKGWBVry02Q" / >

        <div className="card-body">
        <h5 className="card-title">Retirement</h5>
        According to Time, 1 in 3 Americans have $0 saved for retirement
        </div>
      </div>
      <div className="card">
      <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87XTXx8HmTPqdOQ_xeEf_Kp2vO2zflrfCAG_Fpb9MKGWBVry02Q" / >
        <div className="card-body">
        <h5 className="card-title">Budgets</h5>
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
  </div>
)





export default Home;