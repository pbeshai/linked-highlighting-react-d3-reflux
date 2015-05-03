'use strict';

describe('RadialHeatmap', function () {
  var React = require('react/addons');
  var RadialHeatmap, component;

  beforeEach(function () {
    RadialHeatmap = require('components/RadialHeatmap.js');
    component = React.createElement(RadialHeatmap);
  });

  it('should create a new instance of RadialHeatmap', function () {
    expect(component).toBeDefined();
  });
});
