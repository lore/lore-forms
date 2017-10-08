import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import connect from './connect';

export default connect(function(getState, props) {
  return props.callback.apply(null, arguments)
})(
createReactClass({
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
