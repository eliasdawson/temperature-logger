var uuid = require('node-uuid/uuid');

/**
 * Build request body for authentication request
 * @param  {string} clientKey Client key for API authentication
 * @return {string} API authentication request body (JSON)
 */
function buildAuthRequestBody( clientKey ) {
  return JSON.stringify( { auth: { cik: clientKey } } );
}

/**
 * Build request body for API calls
 * @param  {string} procedure Procedure to invoke
 * @param  {string} args Arguments to pass in request
 * @param  {string|number} [id] Desired ID for request
 * @return {string} API request body (JSON)
 */
function buildRequestBody( procedure, args, id ) {

  var requestBody;

  if ( id === undefined ) {
    id = uuid.v4();
  }

  // Build payload object for request
  requestBody = {
    calls: [{
      id: id,
      procedure: procedure,
      arguments: args
    }]
  };

  return JSON.stringify( requestBody );
}

/**
 * Construct Exosite Web Socket object and connect to web socket
 * @param {string} url URL of Exosite Web Socket API
 * @param {string} clientKey Client key for API authentication
 * @param {function} [openCallBack] Method to call upon successful connection
 * @param {function} [messageHandler] Method to call upon receiving messages from web socket
 */
var ExositeWebSocket = function( url, clientKey, openCallBack, messageHandler ) {
  this.socket = new WebSocket( url );

  var self = this;

  this.socket.onopen = function() {
    self.authenticate( clientKey );

    if ( openCallBack !== undefined ) {
      openCallBack();
    }
  };

  if ( messageHandler ) {
    self.socket.onmessage = messageHandler;
  }
};

/**
 * Authenticate against Web Socket with client key
 * @param {string} clientKey Client key for API authentication
 */
ExositeWebSocket.prototype.authenticate = function( clientKey ) {
  this.socket.send( buildAuthRequestBody( clientKey ) );
};

/**
 * Subscribe to web socket with specified arguments
 * @param  {Array<Object>} args Arguments to pass with subscribe request
 * @return {string} Subscription ID
 */
ExositeWebSocket.prototype.subscribe = function( args ) {

  // Create unique ID for subscription
  var subscriptionId = uuid.v4();

  // Build payload for subscribe request
  var requestBody = buildRequestBody( 'subscribe', args, subscriptionId );

  // Send subscribe request
  this.socket.send( requestBody );

  // Return generated subscription ID for future reference
  return subscriptionId;
};

/**
 * Unsubscribe to specified web socket subscription
 * @param {string} subscriptionId ID of subscription to unsubscribe from
 */
ExositeWebSocket.prototype.unsubscribe = function( subscriptionId ) {

  // Build payload for subscribe request
  var requestBody = buildRequestBody( 'unsubscribe', [{ 'subs_id': subscriptionId }], subscriptionId );

  // Send unsubscribe request
  this.socket.send( requestBody );
};

/**
 * Send read request to web socket API
 * @param {Array<Object>} args Arguments to pass with read request
 */
ExositeWebSocket.prototype.read = function( args ) {

  // Build payload for subscribe request
  var requestBody = buildRequestBody( 'read', args );

  // Send read request
  this.socket.send( requestBody );
};

/**
 * Send write request to web socket API
 * @param {Array<Object>} args Arguments to pass with write request
 */
ExositeWebSocket.prototype.write = function( args ) {

  // Build payload for subscribe request
  var requestBody = buildRequestBody( 'write', args );

  // Send read request
  this.socket.send( requestBody );
};

/**
 * Close web socket
 */
ExositeWebSocket.prototype.close = function() {

  // Send close request
  this.socket.close();
};

module.exports = ExositeWebSocket;
