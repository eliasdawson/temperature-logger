var LoggedTemperature = require( './logged-temperature' );

/**
 * Sort temperature objects in ascending order by timestamp. For use with Array.sort.
 * @param  {Object} a First temperature object
 * @param  {Object} b Second temperature object
 * @return {number}   Sort comparison indicator
 */
function sortTemperaturesByTimestampAscending( a, b ) {
  return a.timestamp - b.timestamp;
}

/**
 * Translate temperature socket result into more useful object
 * @constructor
 * @param  {Array<Array<number>>} result Result portion of web socket message
 */
var LoggedTemperatureList = function( result ) {
  var i;
  this.temperatures = [];

  for( i = 0; i < result.length; i += 1 ) {
    this.temperatures.push( new LoggedTemperature( result[i] ) );
  }

  this.sortTemperaturesByTimestampAscending();
};

/**
 * Sort temperature objects in ascending order by timestamp.
 */
LoggedTemperatureList.prototype.sortTemperaturesByTimestampAscending = function() {
  this.temperatures.sort( sortTemperaturesByTimestampAscending );
};

module.exports = LoggedTemperatureList;
