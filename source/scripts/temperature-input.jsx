var React = require( 'react' );

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
        <input className="etl-temp-form-input" type="number" value={this.state.temperature} onChange={this.handleChange} />
        <input className="etl-temp-form-btn" type="submit" value="Write" />
      </form>
    );
  }
});

module.exports = TemperatureInput;
