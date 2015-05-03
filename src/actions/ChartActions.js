import Reflux from 'reflux';

const ChartActions = Reflux.createActions([
  /**
   * Sets a point to be higlighted in charts
   * @param point {Object} - the data point to be highlighted
   */
  'highlight'
]);

export default ChartActions;
