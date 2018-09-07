import React from 'react';
import LineChart from './LineChart.jsx'
import axios from 'axios'

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePlan: null
    }
  }

  render() {
    return (<div>Main</div>)
  }
}

export default Overview