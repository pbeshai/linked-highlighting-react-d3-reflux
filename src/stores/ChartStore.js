import Reflux from 'reflux';
import ChartActions from '../actions/ChartActions';

const ChartStore = Reflux.createStore({
  listenables: ChartActions,

  // store the newly highlighted point and broadcast the change
  onHighlight(point) {
    this.highlight = point;
    this.update();
  },

  // broadcast the currently highlighted point
  update() {
    this.trigger({
      highlight: this.highlight
    });
  }
});

export default ChartStore;
