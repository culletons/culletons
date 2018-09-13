import React from 'react';
import PieChart from '../charts/PieChart.jsx'
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
      y: 5000 - this.props.activePlan.monthlySavings - this.props.activePlan.monthlySpending
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
      <div className="card">
        <div className="card-body border-bottom">
          <div className="card-title plan-title border-bottom">
            {this.props.activePlan.name}</div>
            <div>
              <div>Annual income: ${this.props.activePlan.annualIncome}</div>
              <div>Monthly spending: ${this.props.activePlan.monthlySpending}</div>
              <div>Monthly saving: ${this.props.activePlan.monthlySavings}</div>
              <div>Monthly expense: ${this.props.activePlan.annualIncome}</div>
              <div>Retire by: {this.props.activePlan.retirementAge}</div>
            </div>
          </div>
          <div className="card-body border-bottom">
            <div className="card-title border-bottom"><h4>Monthly breakdown</h4></div>
            <div id="pie"></div>
            Nonono
        </div>
          <div className="card-body">
            <div className="card-title border-bottom"><h4>Spending</h4></div>
            Spending on food, utils, rent etc.
        </div>
      </div>
    )
  }
}

export default Overview