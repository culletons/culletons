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
      title: {
        text: 'Monthly breakdown',
      },
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
    <div>
      <div id="pie"></div>
      {/* {this.state.activePlan && <PieChart options={options} />} */}
    </div>)
  }
}

export default Overview