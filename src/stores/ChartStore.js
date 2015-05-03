import Reflux from 'reflux';
import ChartActions from '../actions/ChartActions';

const ChartStore = Reflux.createStore({
  listenables: ChartActions,

  // broadcast the point upon receiving the highlight action
  onHighlight(point) {
    this.trigger({ highlight: point });
  }
});

export default ChartStore;
