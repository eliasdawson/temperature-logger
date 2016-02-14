var React = require( 'react' );
var moment = require( 'moment' );
var TableRow = require ( 'material-ui/lib/table/table-row' );
var TableRowColumn = require ( 'material-ui/lib/table/table-row-column' );

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
      <TableRow>
        <TableRowColumn>{formatTimestamp(this.props.timestamp)}</TableRowColumn>
        <TableRowColumn>{this.props.temperature}</TableRowColumn>
      </TableRow>
    );
  }
});

module.exports = TemperatureTableRow;
