import React from 'react';

var chart;
class ComparisonChart extends React.Component {
  constructor(props) {
    super(props)
    this.updateChart = this.updateChart.bind(this);
  }

  // inputs updated data to the chart.
  updateChart(retireAge, totalSavings, idealSavings, monthlySpending, totalIncomeSavings) {
    chart.update({
      tooltip: {
        formatter: function() {
            var s;
            if (this.point.name === 'idealSavings') { 
                s = `If you save this amount by age <b>${retireAge}</b>, you<br/> will be able to spend <b>$${monthlySpending.toLocaleString()}</b> per month to<br/> support your living expenses in retirement.`;
            } else {
                s = `Based on your projected savings and target<br/> age, you might have about <b>$${(Number(totalIncomeSavings.toFixed(0))).toLocaleString()}</b> per<br/> month of income in retirement.`;
            }
            return s;
        }
      }
    }, true)

    chart.series[0].update({
      data: [{y: totalSavings, color: '#7cb5ec', name: 'yourSavings'}, {y: idealSavings, color: '#90ed7d', name:'idealSavings'}]
    }, true)
  }

  // calculates the updated data and calls updateChart function with the new data.
  componentDidUpdate(prevProps) {
    if (this.props.activePlan !== prevProps.activePlan) {
      let {activePlan} = this.props;
      let currentAge = activePlan.currentAge;
      let retireAge = activePlan.retirementAge;
      let monthlySpending = activePlan.monthlySpending;
      let monthlySavings = activePlan.monthlySavings;
      let currentSavings = activePlan.currentSavings;
      let lifeExpectancy = 100;

      let totalSavings = currentSavings + (retireAge - currentAge) * (monthlySavings * 12);
      let idealSavings = (lifeExpectancy - retireAge) * (monthlySpending * 12);

      let totalIncomeSavings = totalSavings / ((lifeExpectancy - retireAge) * 12)

      this.updateChart(retireAge, totalSavings, idealSavings, monthlySpending, totalIncomeSavings);
    }
  }

  // initial definition of the bar graph.
  componentDidMount() {
    chart = new Highcharts.chart('bar', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'How much will you need at retirement?'
      },
      xAxis: {
        categories: ['You will have about', 'You will need about'],
        crosshair: true
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        formatter: function() {
          var s;
          if (this.point.name === 'idealSavings') { 
              s = `If you save this amount by age 75, you<br/> will be able to spend $3000 per month to<br/> support your living expenses in retirement.`;
          } else {
              s = 'Based on your projected savings and target<br/> age, you might have about $1900 per<br/> month of income in retirement.';
          }
          return s;
        },
        useHTML: true
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        showInLegend: false,
        data: [{y: 100, color: '#7cb5ec', name: 'yourSavings'}, {y: 200, color: '#90ed7d', name:'idealSavings'}]
      }]
    })
  }

  // renders the bar graph
  render() {
    return (
      <div>
        <div id='bar'></div>
      </div>
    )
  }
}

export default ComparisonChart