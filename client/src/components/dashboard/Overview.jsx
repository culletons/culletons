import React from 'react';
import PieChart from '../charts/PieChart.jsx'
import axios from 'axios'

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePlan: null
    }
  }

  componentDidMount() {
    this.setState({ activePlan: this.props.activePlan})
  }

  render() {
    console.log(this.props.activePlan)
    const options = {
      title: {
        text: 'Monthly breakdown',
      },
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
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
          y: (this.props.activePlan.monthlySavings / 5000)
        }]
    }]
    }


    return (
    <div>
      <PieChart options={options} />
    </div>)
  }
}

export default Overview