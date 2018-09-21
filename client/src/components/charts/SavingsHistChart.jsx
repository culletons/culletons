import React from 'React';
import axios from 'axios';
var chart;

// This linechart displays the the savings and balance amounts recorded from the past 30 days

class SavingsHistChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: [],
      savings: []
    }

    this.updateChart = this.updateChart.bind(this);
    this.getSavingsHistory = this.getSavingsHistory.bind(this);
  }
  
  // This function receives the retirement plan via props, and updates each of the three line series with the savings projections.
  updateChart() {
    chart.series[0].update({
      pointStart: 0,
      data: this.state.balance
    }, true)
    chart.series[1].update({
      pointStart: 0,
      data: this.state.savings
    }, true)
  }


  componentDidUpdate(prevProps) {
    //updates chart whenever component updates
    if(prevProps !== this.props) {
      this.getSavingsHistory();
    }
  }

  componentDidMount() {
    //creates new highcharts chart
    chart = new Highcharts.chart('savingsHistChart', {
      chart: {
        type: 'spline'
      },
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: "Amount"
        }
      },
      xAxis: {
        title: {
          text: "Date"
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
        name: 'Balance',
        data: []
      },
      {
        name: 'Available to Spend',
        data: []
      }],

      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    })
  }

  //retrieves the recorded savings balances from the database and sets the balances to state
  getSavingsHistory() {
    axios.get('/retire/history')
    .then(({data}) => {
      console.log('this is some savings history: ', data);
      this.setState(data);
    })
    .then(this.updateChart)
  }
  
  render() {
    return (
      <div id='savingsHistChart'></div>
    )
  }
}

export default SavingsHistChart;