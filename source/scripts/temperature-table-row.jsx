var React = require( 'react' );
var moment = require( 'moment' );

/**
 * Format unixTime value as string for display
 * @param  {number} unixTime Time to format (in unixTime format)
 * @return {string}          Formatted time for display
 */
function formatTimestamp( unixTime ) {
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
