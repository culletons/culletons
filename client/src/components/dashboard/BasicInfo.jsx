import React from 'react';
import axios from 'axios';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retireAge: 65,
      retireGoal: 3,
      currentAge: 0,
      currentSavings: 0,
      monthlySavings: 0,
      monthlySpending: 0,
      annualIncome: 0,
      currentSlide: 0,
      chartToggle: false,
      chartPoints: []
    };

    this.submitInfo = this.submitInfo.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  nextSlide() {
    let next = this.state.currentSlide + 1;
    this.setState({
      currentSlide: next
    });
  }

  previousSlide() {
    this.setState({
      currentSlide: this.state.currentSlide - 1
    });
  }

  submitInfo() {
    this.setState({ chartToggle: true });
    let userInfoToSubmit = {
      name: 'New Plan',
      userId: this.props.user.userId,
      retireAge: this.state.retireAge,
      retireGoal: this.state.retireGoal,
      currentAge: this.state.currentAge,
      annualIncome: this.state.annualIncome,
      currentSavings: this.state.currentSavings,
      monthlySavings: this.state.monthlySavings,
      monthlySpending: this.state.monthlySpending
    };
    this.props.submitBasic(userInfoToSubmit);
  }

  render() {
    // Create the text which will be displayed to the user dynamically based on inputs while answering questions
    let retireDescriptions = [
      'Planning on pinching pennies',
      'Going to take it easy',
      'Would like to be comfortable',
      'Want to live well',
      'Plan on balling out'
    ];
    let retireDesire = retireDescriptions[this.state.retireGoal - 1];
    let retireCountdown =
      this.state.currentAge !== 0 && this.state.currentAge !== ''
        ? 'Great! Lets see how to get you ready to retire in ' +
          (this.state.retireAge - this.state.currentAge) +
          ' years'
        : '';

    let earningsTax =
      this.state.annualIncome < 10000
        ? 0.1
        : this.state.annualIncome < 30000
          ? 0.15
          : this.state.annualIncome < 90000
            ? 0.25
            : this.state.annualIncome < 400000
              ? 0.3
              : 0.4;
    let monthlyTakehome = (this.state.annualIncome / 12) * (1 - earningsTax);

    let slideOptions = [
      <div className="tab tab0 form-group">
        Lets get some basic information about your retirement goals!
        <br />
      </div>,
      <div className="tab tab1 form-group">
        How early do you want to retire?
        <p>
          <input
            type="number"
            className="form-control"
            value={this.state.retireAge}
            min="1"
            max="100"
            onChange={(event) => {
              this.setState({ retireAge: event.target.value });
            }}
          />
        </p>
      </div>,
      <div className="tab tab2 form-group">
        <label>How well do you want to live when you retire?</label>
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max="5"
            value={this.state.retireGoal}
            className="form-control-range"
            id="retireAgeSlider"
            onChange={(event) => {
              this.setState({ retireGoal: event.target.value });
            }}
          />
          <br />
          {retireDesire}
        </div>
      </div>,
      <div className="tab tab3 form-group">
        How old are you now?
        <p>
          <input
            type="number"
            className="form-control"
            value={this.state.currentAge}
            min="1"
            max="100"
            onChange={(event) => {
              this.setState({ currentAge: event.target.value });
            }}
          />
        </p>
        {retireCountdown}
      </div>,
      <div className="tab tab4 form-group">
        How much progress have you made? What's your current savings?
        <p>
          <input
            type="number"
            className="form-control"
            value={this.state.currentSavings}
            min="0"
            onChange={(event) => {
              this.setState({ currentSavings: event.target.value });
            }}
          />
        </p>
      </div>,
      <div className="tab tab5 form-group">
        What's your annual income?
        <p>
          <input
            type="number"
            className="form-control"
            value={this.state.annualIncome}
            min="0"
            onChange={(event) => {
              this.setState({ annualIncome: event.target.value });
            }}
          />
        </p>
      </div>,
      <div className="tab tab6 form-group">
        Last question, how much of your estimated monthly takehome of ${monthlyTakehome} do you
        save? <br />
        The recommended savings is 10%-14%, which would be around ${monthlyTakehome * 0.12}.
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max={monthlyTakehome}
            value={this.state.monthlySavings}
            className="form-control-range"
            id="saveSpendSlider"
            onChange={(event) => {
              this.setState({
                monthlySavings: event.target.value,
                monthlySpending: monthlyTakehome - event.target.value
              });
            }}
          />
          <br />${this.state.monthlySavings} OR{' '}
          {Math.floor(100 * (this.state.monthlySavings / monthlyTakehome))}%
        </div>
      </div>
    ];

    return (
      <div>
        {!this.state.chartToggle && (
          <div className="card module">
            <div className="card-body">
              <div>
                <h3 className="card-title">Basic Information:</h3>
                <br />
                <form id="basic-info-form">
                  {slideOptions[this.state.currentSlide]}
                  {/* this is the current question the user is on */}

                  <div style={{ overflow: 'auto' }}>
                    <div id="form-buttons">
                      {/* This is the button render control for the form */}
                      {this.state.currentSlide !== 0 && (
                        <button
                          type="button"
                          id="prevBtn"
                          className="btn btn-secondary"
                          onClick={this.previousSlide}
                        >
                          Previous
                        </button>
                      )}
                      {/* Show a "previous" button if the user has answered at least one question and gone on to the next slide */}

                      {this.state.currentSlide !== slideOptions.length - 1 && (
                        <button
                          type="button"
                          id="nextBtn"
                          className="btn btn-light"
                          onClick={this.nextSlide}
                        >
                          Next
                        </button>
                      )}

                      {this.state.currentSlide === slideOptions.length - 1 && (
                        <button
                          type="button"
                          id="nextBtn"
                          className="btn btn-success"
                          onClick={this.submitInfo}
                        >
                          Submit
                        </button>
                      )}
                      {/* If the user is on the final slide, allow them to submit */}
                    </div>
                  </div>

                  <div id="step-icon-row">
                    {slideOptions.map((slideStep, i) => (
                      <span
                        key={i}
                        className={
                          'step ' +
                          (this.state.currentSlide === i ? 'active ' : '') +
                          (this.state.currentSlide > i ? 'finish' : '')
                        }
                      />
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BasicInfo;
