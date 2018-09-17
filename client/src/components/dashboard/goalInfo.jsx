import React from 'react';
import axios from 'axios';
// NOT BEING USED!! PLEASE USE THIS DATA FOR LEGACY!
class GoalInfo extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      familySize: 0,
      numberOfKids: 0,
      travel: 0,
      hobbySpending: 0,
      luxurySpending: 0,
      currentSlide: 0,
      answeredToggle: false
    }
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.submitInfo = this.submitInfo.bind(this);  
  }

  // slides to the next page
  nextSlide() {
    let next = this.state.currentSlide + 1
    this.setState({
      currentSlide: next
    })
  }

  // slides to the previous page
  previousSlide() {
    this.setState({
      currentSlide: this.state.currentSlide - 1
    })
  }

  // post request upon completion of user inputs on goals
  submitInfo() {
    let userInfoToSubmit = {
      userId: this.props.user.userId,
      familySize: this.state.familySize,
      numberOfKids: this.state.numberOfKids,
      travel: this.state.travel,
      hobbySpending: this.state.hobbySpending,
      luxurySpending: this.state.luxurySpending,
    }
    axios.post('/retire/goals', userInfoToSubmit)
    .then(res => {
      alert("Your goals have been set!")
      this.setState({
        answeredToggle: true
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    // this is the physical slides where each element is a page in the slide. Index is the page number.
    let slideOptions = [
        (
          <div className="tab tab0 form-group">
            Optional: Input additional information about your goals to calculate your retirement precisely!
          </div>
        ),
        (
          <div className="tab tab1 form-group">
            Tell us about your current family size
            <p><input type="number" className="form-control" value={this.state.familySize} min="1" max="20" onChange={(event)=>{this.setState({familySize: event.target.value})}} /></p>
          </div>
        ),
        (
          <div className="tab tab2 form-group">
            How many children/grandchildren in your household?
            <p><input type="number" className="form-control" value={this.state.numberOfKids} min="1" max="20" onChange={(event)=>{this.setState({numberOfKids: event.target.value})}} /></p>
          </div>
        ),
        (
          <div className="tab tab3 form-group">
            On average, how much do you spend on travel annually?
            <p><input type="number" className="form-control" value={this.state.travel} min="0" max="10000000" onChange={(event)=>{this.setState({travel: event.target.value})}} /></p>
          </div>
        ),
        (
          <div className="tab tab4 form-group">
            On average, how much do you spend on your hobbies annually?
            <p><input type="number" className="form-control" value={this.state.hobbySpending} min="0" max="10000000" onChange={(event)=>{this.setState({hobbySpending: event.target.value})}} /></p>
          </div>
        ),
        (
          <div className="tab tab5 form-group">
            Last question, on average, how much do you spend on luxuries annually?
            <p><input type="number" className="form-control" value={this.state.luxurySpending} min="0" onChange={(event)=>{this.setState({luxurySpending: event.target.value})}} /></p>
          </div>
        )
      ]
    return (
      // this component renders only if the questions weren't answered.
      <div>
        {!this.state.answeredToggle && 
          <div className="card module">
        <div className="card-body">
        <div>
          <h3 className="card-title">Additional Information:</h3>
          <br/>
          <form id="basic-info-form">
            {slideOptions[this.state.currentSlide]}

            <div style={{"overflow":"auto"}}>
              <div id="form-buttons">
                {this.state.currentSlide !== 0 && <button type="button" id="prevBtn" className="btn btn-secondary" onClick={this.previousSlide}>Previous</button>}
                {this.state.currentSlide !== slideOptions.length - 1 && <button type="button" id="nextBtn" className="btn btn-light" onClick={this.nextSlide}>Next</button>}
                {this.state.currentSlide === slideOptions.length - 1 && <button type="button" id="nextBtn" className="btn btn-success" onClick={this.submitInfo}>Submit</button>}
              </div>
            </div>

            <div id="step-icon-row">
              {slideOptions.map((slideStep, i) => 
                <span key={i} className={"step " + (this.state.currentSlide === i ? 'active ' : '') + (this.state.currentSlide > i ? 'finish' : '')}></span>
              )}
            </div>
          </form>
          </div>
          </div>
          </div>}
      </div>
    )
  }
}

export default GoalInfo;