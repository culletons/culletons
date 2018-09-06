import React from 'React'

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartContainer.current,
      this.props.options
      // define data point options from question answers
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    // returns the element which the chart will be rendered to
    return <div ref={this.chartContainer} />;
  }
}

export default LineChart