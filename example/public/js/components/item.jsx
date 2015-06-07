var React = require('react');

var Item = React.createClass({

  propTypes: {
    remove: React.PropTypes.func,
    content: React.PropTypes.string
  },

  render: function() {
    return(
      <li>
        <span className="item">{this.props.content}</span>
        <span className="remove" onClick={this.props.remove}>x</span>
      </li>
    );
  }
});

module.exports = Item;
