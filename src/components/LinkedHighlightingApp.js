import React from 'react';
import LineChart from './LineChart';
import RadialHeatmap from './RadialHeatmap';

// CSS via webpack
require('normalize.css');
require('../styles/main.css');

const LinkedHighlightingApp = React.createClass({
  getInitialState() {
    // make up some data
    const data = [];
    for (let i = 0; i <= 30; i++) {
      data.push({ distance: i, value: Math.random() * 10 + i });
    }

    return {
      data: data
    };
  },

  // render the line chart and radial heatmap
  render() {
    const { data } = this.state;
    return (
      <div className='main'>
        <LineChart data={data} width={400} height={250} xKey='distance' yKey='value' />
        <RadialHeatmap data={data} width={400} height={250} radiusKey='distance' colorKey='value' />
      </div>
    );
  }
});

React.render(<LinkedHighlightingApp />, document.getElementById('content'));

export default LinkedHighlightingApp;
