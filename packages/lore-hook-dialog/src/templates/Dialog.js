import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';

export default connect(function() {
  return {};
}, { subscribe: true })(createReactClass({
  displayName: 'Dialog',

  propTypes: {
    dialog: PropTypes.node.isRequired
  },

  render: function () {
    const { dialog } = this.props;
    return dialog;
  }
}));
