var React = require('react');

var home = React.createClass({

  render: function() {
    return (
      <div>{this.props.title}</div>
    );
  }

});

module.exports = home;
