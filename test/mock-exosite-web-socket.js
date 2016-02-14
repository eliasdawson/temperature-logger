var mockWebSocket = require( 'mock-socket' ).WebSocket;
var MockServer = require( 'mock-socket' ).Server;

var server = new MockServer( 'ws://localhost:8080' );

/**
 * Handle connection request received by mock web socket server
 */
function connectionHandler() {
  server.send( 'connected' );
}

/**
 * Handle messages received by mock web socket server
 * @param  {string} msg Received message
 */
function messageHander( msg ) {
  try {
    msg = JSON.parse( msg );

    if ( msg.auth !== undefined ) {
      server.send( '{ "status": "ok" }' );
    }
  }
  catch( e ) {
    server.send( 'msg received' );
  }
}

/**
 * Handle close request received by mock web socket server
 */
function closeHandler() {
  server.send( 'closed' );
}

// Bind mock web socket server event handlers
server.on( 'connection', connectionHandler);
server.on( 'message', messageHander);
server.on( 'close', closeHandler);

module.exports = mockWebSocket;
