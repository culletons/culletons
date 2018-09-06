import React from 'react';
import Signup from './header/Signup.jsx'

const Home = (props) => {
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
  return(
  <div>
    <div className="jumbotron jumbotron-fluid" id="home-jumbo">
      <div className="container" style={{marginLeft: 50, marginRight: 25}}>
        <h1 className="display-4">Culletons</h1>
        <p className="lead">If you fail to plan, you plan to fail.</p>
        <p className="lead">Let's plan for <em>SUCCESS</em>.</p>
        <Signup onSignUp={props.onSignUp} authenticate={props.authenticate}/>
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