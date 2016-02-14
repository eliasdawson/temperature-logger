var React = require('react');
var TemperatureTableRow = require('./temperature-table-row.jsx');

var TemperatureTable = React.createClass({
  render: function() {

    var rows = this.props.data.map( function ( temperature, index ) {
      return (
        <TemperatureTableRow key={index} temperature={temperature.temperature} timestamp={temperature.timestamp}/>
      );
    });

    return (
      <table className="etl-temp-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

module.exports = TemperatureTable;
