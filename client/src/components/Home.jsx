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
      <img className="card-img-top" style={{height: 200}} src="https://img01-olxro.akamaized.net/img-olxro/192183283_1_1000x700_servicii-contabilitate-bucuresti.jpg" / >
        <div className="card-body">
        <h5 className="card-title">Financial Planning</h5>
        Planning is bringing the future into the present, so that you can do something about it now.
        </div>
      </div>
      <div className="card">
      <img className="card-img-top" style={{height: 200}} src="https://www.kiplinger.com/kipimages/pages/18206.jpg" / >

        <div className="card-body">
        <h5 className="card-title">Retirement</h5>
        According to <em>Time Magazine</em>, 1 in 3 Americans have $0 saved for retirement because most Americans live paycheck to paycheck.
        </div>
      </div>
      <div className="card">
      <img className="card-img-top" style={{height: 200}} src="https://www.entrepreneurshiplife.com/wp-content/uploads/2016/01/70-Financial-Planning.jpg" / >
        <div className="card-body">
        <h5 className="card-title">Budgets</h5>
        “When money realizes that it is in good hands, it wants to stay and multiply in those hands.” ― <em>Idowu Koyenikan</em>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md=12" style={{padding:50}}>
      In 2016 the average household earned $74,664. Average expenditures were $57,311, leaving $17,353 in free cash flow.

      <ul>Here’s how some of the budget categories that you see breakdown:
        <li>33% of housing costs go to rent and mortgage payments</li>
        <li>The average household spends 56% of their food budget on groceries and 44% on dining out</li>
        <li>40% of transportation costs go to the vehicle, such as paying off an auto loan; 21% goes to gas and oil, with the remaining 32% spent on other costs, such as repairs</li>
        <li>For health care costs, 69% covers insurance</li>
      </ul>
      Plan for success with Culletons: <Signup onSignUp={props.onSignUp}/>

      </div>
    </div>
    </div>
  </div>
)}





export default Home;