import React from 'react';
import d3 from 'd3';
import * as Util from '../util/Util';
import ChartActions from '../actions/ChartActions';

// CSS via webpack
require('styles/LineChart.css');

const LineChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    highlight: React.PropTypes.object,
    width: React.PropTypes.number.isRequired,
    xKey: React.PropTypes.string, // the key for the x value
    yKey: React.PropTypes.string // the key for the y value
  },

  getDefaultProps() {
    return {
      xKey: 'x',
      yKey: 'y'
    };
  },

  componentDidMount() {
    // use d3's events so we get to use the handy d3.mouse function to get x,y in svg coords
    const handleMouseMove = this._handleMouseMove;
    d3.select(React.findDOMNode(this.refs.svg)).on('mousemove', function mouseMoveHandler() {
      handleMouseMove(d3.mouse(this));
    }).on('mouseleave', function mouseOutHandler() {
      handleMouseMove([null, null]);
    });
  },

  componentDidUnmount() {
    // unbind d3 mouse listeners
    d3.select(React.findDOMNode(this.refs.svg)).on('mousemove', null).on('mouseleave', null);
  },

  _handleMouseMove([mouseX, mouseY]) {
    // find nearest data point
    const { data, xKey } = this.props;
    const { x, y } = this._chartComponents();

    // convert the mouse x and y to the domain x and y using our chart scale
    let domainX = x.invert(mouseX);
    let domainY = y.invert(mouseY);

    // if the mouse is outside the domain, consider it having exited
    if (domainX < x.domain()[0] || domainX > x.domain()[1]) {
      domainX = null;
    }
    if (domainY < y.domain()[0] || domainY > y.domain()[1]) {
      domainY = null;
    }

    // send an action indicating which point to highlight if we are near one, otherwise indicate
    // no point should be highlighted.
    if (domainX !== null && domainY !== null && mouseX != null && mouseY != null) {
      // find the nearest point to the x value
      const point = Util.findClosest(data, domainX, (d) => d[xKey]);

      ChartActions.highlight(point);
    } else {
      ChartActions.highlight();
    }
  },

  _chartComponents() {
    const { data, width, height, xKey, yKey } = this.props;

    // create x and y scales that map the chart dimensions to the min/max x and y values in the data
    const xMin = 0, xMax = width, yMin = height, yMax = 0;
    const x = d3.scale.linear().domain(d3.extent(data, (d) => d[xKey])).range([xMin, xMax]);
    const y = d3.scale.linear().domain(d3.extent(data, (d) => d[yKey])).range([yMin, yMax]);

    // function to generate an svg path's d attribute for the series
    // note: interpolation set to 'monotone' ensures the path goes through the points
    const line = d3.svg.line()
      .interpolate('monotone')
      .x((d) => x(d[xKey]))
      .y((d) => y(d[yKey]));

    return {
      x,
      y,
      line
    };
  },

  render() {
    const { data, width, height, xKey, yKey, highlight } = this.props;
    const { x, y, line } = this._chartComponents();

    let highlightMark;
    if (highlight) {
      highlightMark = <circle cx={x(highlight[xKey])} cy={y(highlight[yKey])} r={4} className='highlight-mark' />;
    }

    return (
      <div>
        <svg ref='svg' width={width} height={height} className='chart line-chart'>
          <path d={line(data)} className='series' />
          {highlightMark}
        </svg>
      </div>
    );
  }
});

export default LineChart;
