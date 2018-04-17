import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';

export default connect(function() {
  return {};
}, { subscribe: true })(createReactClass({
  displayName: 'Modal',

  propTypes: {
    dialog: PropTypes.node.isRequired
  },

  /**
   * Have the dialog open after we mount the component to make sure
   * we see the opening transition - if we don't do this, it will
   * immediately snap into view on the screen (without a gentle transition)
   */
  componentDidMount: function() {
    this.show();
  },

  show: function() {
    const modal = this.refs.modal;
    $(modal).modal({
      backdrop: 'static'
    });
  },

  dismiss: function() {
    const modal = this.refs.modal;
    $(modal).modal('hide');
  },

  render: function () {
    const { dialog } = this.props;

    return (
      <div ref="modal" className="modal fade">
        {React.cloneElement(dialog, {
          onCancel: this.dismiss
        })}
      </div>
    );
  }
}));
