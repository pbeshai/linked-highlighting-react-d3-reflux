'use strict';

describe('LineChart', function () {
  var React = require('react/addons');
  var LineChart, component;

  beforeEach(function () {
    LineChart = require('components/LineChart.js');
    component = React.createElement(LineChart);
  });

  it('should create a new instance of LineChart', function () {
    expect(component).toBeDefined();
  });
});
