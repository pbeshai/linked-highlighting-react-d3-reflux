# linked-highlighting-react-d3-reflux
An example of doing linked highlighting using [React](https://facebook.github.io/react/),
[D3.js](http://d3js.org/) and [Reflux](https://github.com/spoike/refluxjs). The project base
was generated using [Yeoman](http://yeoman.io/)'s [react-webpack generator](https://github.com/newtriks/generator-react-webpack).

A line chart and a radial heatmap are drawn, rendering the same set of data. When the user mouses over either chart,
highlighting marks are drawn on both charts.

**Demo**: http://pbeshai.github.io/linked-highlighting-react-d3-reflux/

![Charts with no highlighting](img/chart.png)

*Charts with no highlighting*

![Charts with linked highlighting on mouse over](img/chart_highlight.png)

*Charts with linked highlighting on mouse over*

## Installation

Install npm packages

```npm install```


## Usage

Use grunt to start the web server

```grunt serve```

This will start the `webpack-dev-server` and open a browser to the locally running connect server.

## Author

By Peter Beshai [@pbesh](http://twitter.com/pbesh)
