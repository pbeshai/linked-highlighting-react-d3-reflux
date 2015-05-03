'use strict';

describe('LinkedHighlightingApp', function () {
  var React = require('react/addons');
  var LinkedHighlightingApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    LinkedHighlightingApp = require('components/LinkedHighlightingApp.js');
    component = React.createElement(LinkedHighlightingApp);
  });

  it('should create a new instance of LinkedHighlightingApp', function () {
    expect(component).toBeDefined();
  });
});
