var React = require( 'react' );
var RaisedButton = require( 'material-ui/lib/raised-button' );
var TextField = require( 'material-ui/lib/text-field' );

var TemperatureInput = React.createClass({

  getInitialState: function() {
    return {
      temperature: ''
    };
  },

  handleChange: function( event ) {
    this.setState({ temperature: event.target.value });
  },

  write: function( event ) {
    this.props.writeFn( this.state.temperature );
    event.preventDefault();
  },

  render: function() {
    return (
      <form className="etl-temp-form" onSubmit={this.write}>
        <TextField type="number" value={this.state.temperature} onChange={this.handleChange} floatingLabelText="Temperature" />
        <RaisedButton label="Write" primary={true} type="submit" />
      </form>
    );
  }
});

module.exports = TemperatureInput;
