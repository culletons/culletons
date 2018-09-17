import React from 'React'

var chart;
class ColumnChart extends React.Component {
  constructor(props) {
    super(props)
    this.updateChart = this.updateChart.bind(this);
  }
  

  updateChart(institutions, data) {
    // update the chart with the account information
    chart.update({
      xAxis: {
        categories: institutions
      },
      series: data
    })
  }


  componentDidUpdate(prevProps) {
    // when component receives accounts from plaid, populate the chart that was created on mount
    if(this.props.accounts !== prevProps.accounts) {
      var {accounts} = this.props
      var institutions = []
      var accData = {}
      var series = []

      // map through the account props and put into array to update the chart
      accounts.accountList.map(account => {
        if (institutions.indexOf(account.institutionName) === -1) {
          institutions.push(account.institutionName)
        }
  
        if (!accData[account.name]) {
          accData[account.name] = [account.balances.current]
        } else if (accData[account.name] !== undefined) {
          accData[account.name].push(account.balances.current)
        }
      })
  
      for (var key in accData) {
        series.push({
          name: key,
          data: accData[key]
        })
      }
      // pass the arrays to highcharts updater fn
      this.updateChart(institutions, series)
    }
  }

  componentDidMount() {
    // create the chart with empty series. chart update requires preexisting series to update
    chart = new Highcharts.chart('column', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: { 
        categories: [],
        crosshair: true
      },
      yAxis: {
        min: 0,
        text: 'Thousands ($)'
      },
      series: [{name: '', data: []}, {name: '', data: []},{name: '', data: []},{name: '', data: []},{name: '', data: []}]
      })
  }
  
  
  render() {
    return (
      <div>
        <div id='column'></div>
        
      </div>
    )
    }
}

export default ColumnChart
