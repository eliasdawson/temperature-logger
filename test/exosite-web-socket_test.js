var ExositeWebSocket = require( '../source/scripts/exosite-web-socket' );
var mockSocket = require( './mock-exosite-web-socket' );

// Use mock websocket for test connections
window.WebSocket = mockSocket;

describe( 'ExositeWebSocket', function () {

  //var noop = function() {};

  var socket;
  var messages;

  beforeEach( function( done ) {

    // Clear messages stored from other tests
    messages = [];

    // Initialize mock web socket
    socket = new ExositeWebSocket( 'ws://localhost:8080',  '' );

    // Store messages returned from mock web socket
    socket.socket.onmessage = function( event ) {
      messages.push( event );
      if ( messages.length === 2 ) {
        done();
      }
    };
  });

  describe( 'constructor', function () {

    it( 'should authenticate automatically after connecting', function () {
      expect( messages.length ).toEqual( 2 );
      expect( JSON.parse( messages[1].data ).status ).toEqual( 'ok' );
    });

  });

  describe( 'authenticate', function () {

    it( 'should authenticate automatically after connecting', function ( done ) {
      socket.socket.onmessage = function( event ) {
        expect( JSON.parse( event.data ).status ).toEqual( 'ok' );
        done();
      };
      socket.authenticate( '' );
    });

  });

  describe( 'subscribe', function () {

    xit( 'should use the subscribe procedure', function () {
      // TODO: Add test code
    });

    xit( 'should automatically receive messages sent after subscribing', function () {
      // TODO: Add test code
    });

    xit( 'should return subscription ID upon successful subscription', function () {
      // TODO: Add test code
    });

  });

  describe( 'unsubscribe', function () {

    xit( 'should use the unsubscribe procedure', function () {
      // TODO: Add test code
    });

    xit( 'should not receive messages sent after unsubscribing', function () {
      // TODO: Add test code
    });

  });

  describe( 'read', function () {

    xit( 'should use the read procedure', function () {
      // TODO: Add test code
    });

    xit( 'should return data based on passed arguments', function () {
      // TODO: Add test code
    });

  });

  describe( 'write', function () {

    xit( 'should use the write procedure', function () {
      // TODO: Add test code
    });

    xit( 'should return written data when subsequently read', function () {
      // TODO: Add test code
    });

  });

  describe( 'close', function () {

    xit( 'should error when sending after closing connection', function () {
      // TODO: Add test code
    });

  });

  afterEach( function() {
    socket.socket.close();
  });

});
