var React = require('react');
var moment = require('moment');

function formatTimestamp(unixTime) {
  var timestamp = new moment( unixTime * 1000 );
  return timestamp.format( 'HH:mm:ss' );
}

var TemperatureTableRow = React.createClass({

  render: function() {
    return (
      <tr className="etl-temp-table-row">
        <td className="etl-temp-table-timestamp">{formatTimestamp(this.props.timestamp)}</td>
        <td className="etl-temp-table-row">{this.props.temperature}</td>
      </tr>
    );
  }
});

module.exports = TemperatureTableRow;
