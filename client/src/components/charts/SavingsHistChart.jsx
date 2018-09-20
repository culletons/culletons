import React from 'React'
var chart;

// This linechart displays the retirement plan projected over time

class SavingsHistChart extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  
  // This function receives the retirement plan via props, and updates each of the three line series with the savings projections.
  updateChart() {
    chart.series[0].update({
      pointStart: 0,
      data: [[1, 300], [2, 400], [3, 500], [4, 600]]
    }, true)
    chart.series[1].update({
      pointStart: 0,
      data: [[1, 150], [2, 200], [3, 250], [4, 300]]
    }, true)
  }


  // componentDidUpdate() {
  //   this.updateChart();
  // }

  componentDidMount() {
    chart = new Highcharts.chart('savingsHistChart', {
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
    this.updateChart([0,0])
  }
  
  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="card-body col-md-3">
            <div className="card-title plan-title border-bottom"></div>
            <br/>
          </div>
          <div className="col-md-9">
            <div id='savingsHistChart'></div>
          </div>
         </div>
       </div>
    )
  }
}

export default SavingsHistChart;