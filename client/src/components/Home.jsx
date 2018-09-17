import React from 'react';
import Signup from './header/Signup.jsx'

const Home = (props) => {
  // this is just a static home page to display to new users and provide them with short intro to the app
  return (
    <div>
      <div className="jumbotron jumbotron-fluid" id="home-jumbo">
        <div className="container" style={{ marginLeft: 50, marginRight: 25 }}>
          <h1 className="display-4">Plan+Life</h1>
          <p className="lead">If you fail to plan, you plan to fail. </p>
          <p className="lead">Let's plan for <em>SUCCESS</em>.</p>
          <div className="pb-1"></div>
          <Signup emailAndPassSignUp={props.emailAndPassSignUp} googleSignUp={props.googleSignUp} />
        </div>
      </div>
      <div className="container">
        <div className="card-deck">
          <div className="card " >
            <img className="card-img-top" style={{ height: 200 }} src="https://img01-olxro.akamaized.net/img-olxro/192183283_1_1000x700_servicii-contabilitate-bucuresti.jpg" />
            <div className="card-body">
              <h5 className="card-title text-center">Financial Planning</h5>
              Planning is bringing the future into the present, so that you can do something about it now.
        </div>
          </div>
          <div className="card">
            <img className="card-img-top" style={{ height: 200 }} src="https://www.kiplinger.com/kipimages/pages/18206.jpg" />

            <div className="card-body">
              <h5 className="card-title text-center">Retirement</h5>
              According to <em>Time Magazine</em>, 1 in 3 Americans have $0 saved for retirement because most Americans live paycheck to paycheck.
        </div>
          </div>
          <div className="card">
            <img className="card-img-top" style={{ height: 200 }} src="https://www.entrepreneurshiplife.com/wp-content/uploads/2016/01/70-Financial-Planning.jpg" />
            <div className="card-body">
              <h5 className="card-title text-center">Budgets</h5>
              “When money realizes that it is in good hands, it wants to stay and multiply in those hands.” ― <em>Idowu Koyenikan</em>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-2"></div>
          <div className="col-md-4 text-right p-4" >
            <h5>In 2016, the average American household earned $74,664. Average expenditures were around $57,311, leaving $17,353 in free cash flow.</h5>
            <h6 className="theme">Here’s how some of the budget categories breakdown per household</h6>
          </div>
          <div className="col-md-6 vertical-align"><i className="fa fa-5x fa-list-alt" aria-hidden="true"></i></div>
        </div>

        <div className="row">
          <div className="col-md-5" ></div>
          <div className="col-md-1 vertical-align"><i className="fa fa-5x fa-home" aria-hidden="true"></i></div>
          <div className="col-md-4 text-left p-4" >
            <h5>33% of housing costs go to rent and mortgage payments</h5>
            <h6 className="theme">A majority of New Yorkers are considered rent burdened</h6>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4 text-right p-4" >
            <h5>The average household spends 56% of their food budget on groceries and 44% on dining out</h5>
            <h6 className="theme">Food is ridiculously expensive in New York</h6>
          </div>
          <div className="col-md-6 vertical-align"><i className="fa fa-5x fa-glass" aria-hidden="true"></i></div>
        </div>

        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-1 vertical-align"><i className="fa fa-5x fa-truck" aria-hidden="true"></i></div>
          <div className="col-md-4 text-left p-4" >
            <h5>40% of transportation costs go to the vehicle, such as paying off an auto loan; 21% goes to gas and oil, with the remaining 32% spent on other costs, such as repairs</h5>
            <h6 className="theme">But who drives here anyways?</h6>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row pb-5">
          <div className="col-md-2"></div>
          <div className="col-md-4 text-right p-4" >
            <h5>The average couple retiring today at age 65 will need $280,000 to cover health care and medical costs in retirement</h5>
            <h5 className="theme">Will <strong>YOU</strong> be ready?</h5>
          </div>
          <div className="col-md-6 vertical-align"><i className="fa fa-5x fa-medkit" aria-hidden="true"></i></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center pb-5">
            <div className="pb-2"></div>
            <i className="fa fa-5x fa-thumbs-o-up" aria-hidden="true"></i>
            <h5> Plan for success with Plan+Life! </h5>
            <Signup onSignUp={props.onSignUp} />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <div>
      </div>
    </div>
)}





export default Home;