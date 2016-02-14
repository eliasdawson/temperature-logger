/**
 * Translate temperature socket result into more useful object
 * @constructor
 * @param  {Array<number>} result Result portion of web socket message
 */
var LoggedTemperature = function( result ) {
  this.timestamp = result[0];
  this.temperature = result[1];
};

/**
 * Sort temperature objects in ascending order by timestamp. For use with Array.sort.
 * @param  {Object} a First temperature object
 * @param  {Object} b Second temperature object
 * @return {number}   Sort comparison indicator
 */
LoggedTemperature.prototype.sortTemperaturesByTimestampAscending = function( a, b ) {
  return a[0] - b[0];
};

module.exports = LoggedTemperature;
