import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default lore.connect(function(getState, props) {
  return props.callback.apply(null, arguments)
})(
React.createClass({
  displayName: 'Connect',

  propTypes: {
    callback: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  },

  render: function() {
    var props = _.omit(this.props, [
      'callback',
      'children'
    ]);

    return React.cloneElement(this.props.children, props)
  }

}));
