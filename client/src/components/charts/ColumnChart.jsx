import React from 'React'

var chart;
class ColumnChart extends React.Component {
  constructor(props) {
    super(props)
    this.updateChart = this.updateChart.bind(this);
  }
  

  updateChart(institutions, data) {
    chart.update({
      xAxis: {
        categories: institutions
      },
      series: data
    })
  }


  componentDidUpdate(prevProps) {
    if(this.props.accounts !== prevProps.accounts) {
      var {accounts} = this.props
      var institutions = []
      var accData = {}
      var series = []
  
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
      this.updateChart(institutions, series)
    }
  }

  componentDidMount() {
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
        <div id='column'>Hi</div>
      </div>
    )
    }
}

export default ColumnChart
