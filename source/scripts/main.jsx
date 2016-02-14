var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var TemperatureLog = require( './temperature-log.jsx' );

ReactDOM.render(
  <TemperatureLog/>,
  document.getElementById( 'app' )
);


window.temperatureChartData = [];

document.addEventListener( 'temperatureUpdated', window.drawTemperatureChart );

window.drawTemperatureChart = function() {
  var chart;
  var data;

  if ( window.temperatureChartData.length > 0 && google !== undefined && google.visualization !== undefined ) {
    data = google.visualization.arrayToDataTable( window.temperatureChartData );

    // Instantiate and draw the chart.
    chart = new google.visualization.LineChart( document.getElementById( 'temperatureChart' ) );
    chart.draw( data, null );
  }
};
