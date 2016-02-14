var React = require( 'react' );

var TemperatureTableRow = React.createClass({

  render: function() {
    return (
      <tr className="etl-temp-table-row">
        <td className="etl-temp-table-timestamp">{this.props.timestamp}</td>
        <td className="etl-temp-table-row">{this.props.temperature}</td>
      </tr>
    );
  }
});

module.exports = TemperatureTableRow;
