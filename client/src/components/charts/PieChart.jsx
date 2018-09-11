import React from 'React'

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartContainer.current,
      this.props.options
    );
  }

  componentWillUnmount() {
    // this.chart.destroy();
  }

  render() {
    return <div ref={this.chartContainer} />;
  }
}

export default PieChart