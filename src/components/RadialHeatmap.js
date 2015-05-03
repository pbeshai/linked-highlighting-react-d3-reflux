import React from 'react';
import d3 from 'd3';
import ChartActions from '../actions/ChartActions';

// CSS via webpack
require('styles/RadialHeatmap.css');

const RadialHeatmap = React.createClass({
  propTypes: {
    colorKey: React.PropTypes.string, // the key for the colour value
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    highlight: React.PropTypes.object,
    radiusKey: React.PropTypes.string, // the key for the radius value
    width: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      radiusKey: 'r',
      colorKey: 'color'
    };
  },

  _handleHover(d) {
    // send an action indicating which data point to highlight
    ChartActions.highlight(d);
  },

  render() {
    const { data, width, height, radiusKey, colorKey, highlight } = this.props;

    // set up scales for radius and colour based on the min/max in the data set
    const strokeWidth = Math.ceil(width / (data.length * 2));
    const r = d3.scale.linear().domain(d3.extent(data, (d) => d[radiusKey])).range([strokeWidth, (width - strokeWidth) / 2]);
    const color = d3.scale.linear().domain(d3.extent(data, (d) => d[colorKey])).range(['#edf8b1', '#2c7fb8']);

    return (
      <div>
        <svg ref='svg' width={width} height={height} className='chart radial-heatmap'>
          {data.map((d, i) => {
            // set the highlight class name if this element is highlighted
            const className = highlight && d[radiusKey] === highlight[radiusKey] ? 'highlight' : '';
            return (
              <circle key={i} className={className} r={r(d[radiusKey])} cx={width / 2}
                      cy={-r(0) / 2} strokeWidth={strokeWidth} stroke={color(d[colorKey])}
                      onMouseOver={this._handleHover.bind(this, d)}
                      onMouseOut={this._handleHover.bind(this, null)}
                    />
           );
          })}
        </svg>
      </div>
    );
  }
});

export default RadialHeatmap;
