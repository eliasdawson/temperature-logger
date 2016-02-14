//var ExositeWebSocket = require('./exosite-web-socket');
var React = require('react');
var ReactDOM = require('react-dom');
var TemperatureLog = require('./temperature-log.jsx');

ReactDOM.render(
  <TemperatureLog/>,
  document.getElementById('app')
);
/*
var socket;

function getLastFiveTemps(socket) {
  socket.read([
    { 'alias': 'temperature' },
    { 'limit': 5 }
  ]);
}

function writeTemp(temp) {
  socket.write([
    { 'alias': 'temperature' },
    temp
  ]);
}

function socketOpen() {
  getLastFiveTemps(socket);

  var subscriptionId = socket.subscribe([
    { 'alias': 'temperature' },
    { 'since': Date.now() }
  ]);

  socket.unsubscribe( subscriptionId );

  setTimeout(function() {
    writeTemp('77.7777');
  }, 2000);

  //getLastFiveTemps(socket);
}

socket = new ExositeWebSocket( 'wss://m2.exosite.com/ws', 'dbc6361c3e22bd647118747e398f8f1b6e6498f3', socketOpen );

socket.socket.onmessage = function(event) {
  var response = JSON.parse(event.data);
  console.log(event, response);
  document.write( '<br/>' + event.data );
};

socket.socket.onerror = function(event) {
  console.log('error');
  console.log(event);
};

window.onbeforeunload = function() {
  socket.close();
};
*/
