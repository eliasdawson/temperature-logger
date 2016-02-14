var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var injectTapEventPlugin = require( 'react-tap-event-plugin' );
var TemperatureLog = require( './temperature-log.jsx' );


// Needed for onTouchTap for Material UI
// Can go away when react 1.0 release
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
  <TemperatureLog/>,
  document.getElementById( 'app' )
);
