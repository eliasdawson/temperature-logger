var React = require( 'react' );
var ExositeWebSocket = require( './exosite-web-socket' );
var LoggedTemperature = require( './logged-temperature' );
var LoggedTemperatureList = require( './logged-temperature-list' );
var TemperatureTable = require( './temperature-table.jsx' );
var TemperatureInput = require( './temperature-input.jsx' );

/**
 * Number of temperatures expected to be logged
 * @type {number}
 * @const
 */
var LOGGED_TEMPERATURES = 5;

/**
 * Client key used for socket authentication
 * @type {string}
 * @const
 */
var CLIENT_KEY = 'dbc6361c3e22bd647118747e398f8f1b6e6498f3';

/**
 * Read last n (configured in constant) temperatures from specified socket.
 * @param  {ExositeWebSocket} socket ExositeWebSocket object to connect to
 */
function getLatestTemps( socket ) {
  socket.read([
    { 'alias': 'temperature' },
    { 'limit': LOGGED_TEMPERATURES }
  ]);
}

var TemperatureLog = React.createClass({

  /**
   * Handler for web socket connection. Get initial data and subscribe to future updates
   */
  connectionCallback: function() {
    this.state.socket.subscribe([
      { 'alias': 'temperature' },
      { 'since': Date.now() }
    ]);
    getLatestTemps( this.state.socket );
  },

  /**
   * Handler for web socket messages. Update app state with returned temperatures.
   * @param  {string} msg JSON response from web socket
   */
  messageHandler: function( msg ) {
    var receivedTemperatures;
    var updatedTemperatures = [];
    var updatedState = this.state;
    var data = JSON.parse( msg.data );

    // TODO: assumptions are made about data based on format.
    // A more definitive and flexible method would be preferred.
    if ( data.length > 0 ) {
      if ( data[0].result !== undefined ) {
        // TODO: generalize to handle other numbers of results besides 1 or the expected number
        if ( data[0].result.length === LOGGED_TEMPERATURES ) {
          // Received expected number of temperatures (initial call)
          receivedTemperatures = new LoggedTemperatureList( data[0].result );
          updatedState.temperatures = receivedTemperatures.temperatures;
        } else if ( data[0].result.length === 2 ) {
          // Received single temperature (subsequent updates)
          // Remove oldest temperature to limit to desired number
          if ( this.state.temperatures.length >= LOGGED_TEMPERATURES ) {
            updatedState.temperatures = updatedState.temperatures.slice( 1 );
          }
          updatedState.temperatures.push( new LoggedTemperature( data[0].result ) );
        }
      }
    }

    this.setState( updatedState );
  },

  /**
   * Write temperature to web socket
   * @param  {number} temperature Temperature to write to web socket
   */
  writeTemperature: function( temperature ) {
    this.state.socket.write([
      { 'alias': 'temperature' },
      temperature
    ]);
  },

  getInitialState: function() {
    return {
      socket: new ExositeWebSocket( 'wss://m2.exosite.com/ws', CLIENT_KEY, this.connectionCallback, this.messageHandler ),
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
