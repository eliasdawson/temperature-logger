var React = require('react');
var ExositeWebSocket = require('./exosite-web-socket');
var TemperatureTable = require('./temperature-table.jsx');
var TemperatureInput = require('./temperature-input.jsx');

function getLastFiveTemps( socket ) {
  socket.read([
    { 'alias': 'temperature' },
    { 'limit': 5 }
  ]);
}

function buildTemperatureObject( result ) {
  return {
    timestamp: result[0],
    temperature: result[1]
  };
}

function sortTemperaturesByTimestampAscending(a, b) {
  return a[0] - b[0];
}

var TemperatureLog = React.createClass({

  connectionCallback: function() {
    this.state.socket.subscribe([
      { 'alias': 'temperature' },
      { 'since': Date.now() }
    ]);
    getLastFiveTemps( this.state.socket );
  },

  messageHandler: function( msg ) {
    var i;
    var receivedTemperatures;
    var updatedTemperatures = [];
    var updatedState = this.state;
    var data = JSON.parse(msg.data);

    if ( data.length > 0 ) {
      if ( data[0].result !== undefined ) {
        if ( data[0].result.length === 5 ) {
          receivedTemperatures = data[0].result;
          receivedTemperatures.sort( sortTemperaturesByTimestampAscending );
          for( i = 0; i < receivedTemperatures.length; i += 1 ) {
            updatedTemperatures.push( buildTemperatureObject(receivedTemperatures[i]));
          }
          updatedState.temperatures = updatedTemperatures;
        } else if ( data[0].result.length === 2 ) {

          if ( this.state.temperatures.length >= 5 ) {
            updatedState.temperatures = updatedState.temperatures.slice(1);
          }
          updatedState.temperatures.push( buildTemperatureObject( data[0].result ) );
        }
      }
    }

    this.setState(updatedState);
  },

  writeTemperature: function( temperature ) {
    this.state.socket.write([
      { 'alias': 'temperature' },
      temperature
    ]);
  },

  getInitialState: function() {
    return {
      socket: new ExositeWebSocket( 'wss://m2.exosite.com/ws', 'dbc6361c3e22bd647118747e398f8f1b6e6498f3', this.connectionCallback, this.messageHandler ),
      temperatures: [],
    };
  },

  render: function() {
    return (
      <div className='etl-temp-log'>
        <TemperatureInput writeFn={this.writeTemperature} />
        <TemperatureTable data={this.state.temperatures}/>
      </div>
    );
  }
});

module.exports = TemperatureLog;
