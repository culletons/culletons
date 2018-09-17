import React from 'react';
import PieChart from '../charts/PieChart.jsx'
import LineChart from '../charts/LineChart.jsx'
import ColumnChart from '../charts/ColumnChart.jsx'
import ComparisonChart from '../charts/ComparisonChart.jsx';
import axios from 'axios'

var chart
class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
 
    }
    this.updateChart = this.updateChart.bind(this)
  }
  

  updateChart() {
    chart.series[0].setData([{
      name: 'Saving',
      y: this.props.activePlan.monthlySavings,
      sliced: true,
      selected: true
    }, {
      name: 'Expense',
      y: ( this.props.activePlan.annualIncome / 12 ) - this.props.activePlan.monthlySavings - this.props.activePlan.monthlySpending
    }, {
      name: 'Spending',
      y: this.props.activePlan.monthlySpending
    }])

  }

  componentDidUpdate(prevProps) {
    if (this.props.activePlan !== prevProps.activePlan) {
      this.updateChart()
    }
  }

  componentDidMount() {
   chart = new Highcharts.Chart({
     title: { text: ''},
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'pie'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        colorByPoint: true,
        data: [{
          name: 'Saving',
          y: 20,
          sliced: true,
          selected: true
        }, {
          name: 'Expense',
          y: 50
        }, {
          name: 'Spending',
          y: 30
        }]
      }]
    })
  }

  render() {
    return (
      <div className="card overview">
        {/* <div className="card-body border-bottom">
          <div className="card-title plan-title border-bottom">
            {this.props.activePlan.name}</div>
            <div className="row">
            <div className="col-md-3">
              <div>Annual income:</div>
              <div>Monthly spending:</div>
              <div>Monthly saving:</div>
              <div>Monthly expense:</div>
              <div>Retire by:</div>
              </div>
              <div className="col-md-3">
              <div>${this.props.activePlan.annualIncome.toLocaleString()}</div>
              <div>${this.props.activePlan.monthlySpending.toLocaleString()}</div>
              <div>${this.props.activePlan.monthlySavings.toLocaleString()}</div>
              <div>${this.props.activePlan.annualIncome.toLocaleString()}</div>
              <div>{this.props.activePlan.retirementAge}</div>
              </div>
              <div className="col-md-3">
              <div></div>
              {(this.props.activePlan.monthlySpending < 3000) && <a className="approved" tabindex="0" data-toggle="popover" data-placement="right" title="The recommended spending is 15%" >GOOD</a>}
              </div>
            </div>
          </div> */}

          <div className="card-body border-bottom">
            <div className="card-title border-bottom"><h4>Monthly breakdown</h4></div>
            <div id="pie"></div>
          </div>
          <div className="card-body border-bottom">
            <div className="card-title border-bottom"><h4>Account balances</h4></div>
            <ColumnChart activePlan={this.props.activePlan} accounts={this.props.accounts} />
          </div>

            <div className="card-body">
            <div className="card-title border-bottom"><h4>Retirement Calculator</h4></div>
            <ComparisonChart activePlan={this.props.activePlan} plans={this.props.plans} goals={this.props.goals}/>
          </div>


      </div>
    )
  }
}

export default Overview