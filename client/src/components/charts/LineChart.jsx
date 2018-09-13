import React from 'React'
var chart;
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  

  updateChart(dataPlots) {
    chart.series[0].update({
      pointStart: this.props.activePlan.currentAge,
      data: dataPlots
    }, true)
  }


  componentDidUpdate(prevProps) {
    if (this.props.activePlan !== prevProps.activePlan) {
      let {activePlan} = this.props
      let dataPlots = [];
      if (activePlan) {
        let savings = activePlan.currentSavings;
        let age = activePlan.currentAge;
        while(savings > 0) {
          if (age < activePlan.retirementAge) {
            savings = savings + (activePlan.monthlySavings * 12);
            dataPlots.push(savings);
            age++;
          } else {
            savings = savings - (activePlan.monthlySpending * 12); //add factors from 'GOALS'
            if (savings >= 0) {
              dataPlots.push(savings);
            }
            age++;
          }
        } 
      }
      this.updateChart(dataPlots)    
    }
  }

  componentDidMount() {
    chart = new Highcharts.chart('lineChart', {
      chart: {
        type: 'spline'
      },
      title: {
        text: "Here's a look at your potential retirement path"
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
          pointStart: 0
        }
      },
      series: [{
        name: 'Savings',
        data: []
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    })
  }
  
  render() {
    return (
      <div>
        <div id='lineChart'></div>
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