import React from 'React'
var chart;
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  

  updateChart(retirePlan) {
    chart.series[0].update({
      pointStart: this.props.activePlan.currentAge,
      data: retirePlan.retireSavingsMidReturns
    }, true)
    chart.series[1].update({
      pointStart: this.props.activePlan.currentAge,
      data: retirePlan.retireSavingsHighReturns
    }, true);
    chart.series[2].update({
      pointStart: this.props.activePlan.currentAge,
      data: retirePlan.retireSavingsLowReturns
    }, true)
  }


  componentDidUpdate(prevProps) {
      this.updateChart(this.props.retirePlan);
  }



  componentDidMount() {
    chart = new Highcharts.chart('lineChart', {
      chart: {
        type: 'spline'
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: "Your Savings"
        }
      },
      xAxis: {
        title: {
          text: "Age"
        }
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 0,
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Projected Savings',
        data: []
      },
      {
        name: 'High Returns',
        data: [],
      },
      {
        name: 'Low Returns',
        data: []
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    })
    this.updateChart([0,0])
  }
  
  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="card-body col-md-3">
            <div className="card-title plan-title border-bottom">
              {this.props.activePlan.name}
            </div>
            <div>
              <div>Retire by: {this.props.activePlan.retirementAge}</div>
              <div>Starting Annual income: ${this.props.activePlan.annualIncome}</div>
              <div>Savings Rate: {this.props.retirePlan.savingsRate}%</div>
              <div>Retirement Goal: ${this.props.retirePlan.savingsAtRetirement}</div>
              <div>Retirement budget: ${this.props.retirePlan.spendingAtRetirement}</div>
            </div>
            <br/>
            <div id="explaination">
              From your current savings of <b>${this.props.activePlan.currentSavings}</b> at the age of <b>{this.props.activePlan.currentAge}</b>,
              this plan projects a salary growth to <b>${this.props.retirePlan.salaryAtRetirement}</b> while maitaining a savings rate of <b>{this.props.retirePlan.savingsRate}%</b>.
              This results in a total estimated savings by the age of <b>{this.props.activePlan.retirementAge}</b> to be <b>${this.props.retirePlan.savingsAtRetirement}</b>.
              Estimated annual spending will be <b>${this.props.retirePlan.spendingAtRetirement}</b> based on projections
            </div>
          </div>
          <div className="col-md-9">
            <div id='lineChart'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default LineChart
















    // this.chartContainer = React.createRef();


  // componentDidMount() {
  //   this.chart = new Highcharts[this.props.type || 'Chart'](
  //     this.chartContainer.current,
  //     this.props.options
  //     // define data point options from question answers
  //   );
  // }
  
  // componentWillUnmount() {
  //   // this.chart.destroy();
  // }