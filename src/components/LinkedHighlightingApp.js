import React from 'react';
import Reflux from 'reflux';

import LineChart from './LineChart';
import RadialHeatmap from './RadialHeatmap';
import ChartStore from '../stores/ChartStore';

// CSS via webpack
require('normalize.css');
require('../styles/main.css');

const LinkedHighlightingApp = React.createClass({
  mixins: [
    Reflux.ListenerMixin
  ],

  getInitialState() {
    // make up some data
    const data = [];
    for (let i = 0; i <= 30; i++) {
      data.push({ distance: i, value: Math.random() * 10 + i });
    }

    return { data };
  },

  componentDidMount() {
    this.listenTo(ChartStore, this._onChartStoreChange);
  },

  _onChartStoreChange(payload) {
    this.setState({
      chartHighlight: payload.highlight
    });
  },

  // render the line chart and radial heatmap
  render() {
    const { data, chartHighlight } = this.state;
    return (
      <div className='main'>
        <LineChart data={data} width={400} height={250} xKey='distance' yKey='value' highlight={chartHighlight} />
        <RadialHeatmap data={data} width={400} height={250} radiusKey='distance' colorKey='value' highlight={chartHighlight} />
      </div>
    );
  }
});

React.render(<LinkedHighlightingApp />, document.getElementById('content'));

export default LinkedHighlightingApp;
