import React from 'react';
import PieChart from '../charts/PieChart.jsx'
import LineChart from '../charts/LineChart.jsx'
import ColumnChart from '../charts/ColumnChart.jsx'
import ComparisonChart from '../charts/ComparisonChart.jsx';
import SavingsHistChart from '../charts/SavingsHistChart.jsx';
import axios from 'axios'

var chart
class Overview extends React.Component {
  constructor(props) {
    super(props)
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
    //If the plan changes, update the chart
    if (this.props.activePlan !== prevProps.activePlan) {
      this.updateChart()
    }
  }

  componentDidMount() {
    // Currently, the pie chart has hard coded starting values until you select a plan and is not its own 
    // individual component.
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
      {/* Each card body shows an aspect of their finances, usually rendering out a graphic/visual aide */}
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
          <div className="card-body">
            <div className="card-title border-bottom"><h4>Savings History</h4></div>
            <SavingsHistChart/>
          </div>
      </div>
    )
  }
}

export default Overview