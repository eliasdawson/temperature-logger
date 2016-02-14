var React = require( 'react' );
var TemperatureTableRow = require( './temperature-table-row.jsx' );
var Table = require ( 'material-ui/lib/table/table' );
var TableHeader = require ( 'material-ui/lib/table/table-header' );
var TableBody = require ( 'material-ui/lib/table/table-body' );
var TableRow = require ( 'material-ui/lib/table/table-row' );
var TableHeaderColumn = require ( 'material-ui/lib/table/table-header-column' );

var TemperatureTable = React.createClass({
  render: function() {

    var rows = this.props.data.map( function ( temperature, index ) {
      return (
        <TemperatureTableRow key={index} temperature={temperature.temperature} timestamp={temperature.timestamp}/>
      );
    });

    return (
      <div className="etl-temp-table">
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Timestamp</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
});

module.exports = TemperatureTable;
