var React = require('react');

var ENTER_KEY_CODE = 13;

var Create = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
  },

  getInitialState: function () {
    return {
      value: ''
    };
  },

  render: function() {
    return (
      <div className="create-box">
        <input
          type="text"
          placeholder="press enter to save"
          onKeyDown={this._onKeyDown}
          onChange={this._onChange}
          value={this.state.value}/>
      </div>
    );
  },

  _onKeyDown: function (event) {
    if (event.keyCode === ENTER_KEY_CODE) this.save();
  },

  _onChange: function (event) {
    this.state.value = event.target.value;
    this.setState({
      value: event.target.value
    });
  },

  save: function () {
    if (!this.state.value) return;
    this.props.add(this.state.value);
    this.setState({
      value: ''
    });
  }
});

module.exports = Create;
