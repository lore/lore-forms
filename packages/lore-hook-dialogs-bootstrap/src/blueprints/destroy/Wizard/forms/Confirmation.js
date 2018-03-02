import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'Confirmation',

  propTypes: {
    callbacks: PropTypes.object
  },

  render: function() {
    const { modelName } = this.props;
    const {
      title = `Delete ${_.capitalize(modelName)}`,
      description = '',
      successMessage = `${_.capitalize(modelName)} deleted.`,
      callbacks
    } = this.props;

    return (
      <div>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.onCancel}>
            <span>&times;</span>
          </button>
          {title ? (
            <h4 className="modal-title">
              {title}
            </h4>
          ) : null}
          {description ? (
            <p className="help-block">
              {description}
            </p>
          ) : null}
        </div>
        <div className="modal-body">
          {successMessage}
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={callbacks.onCancel}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

});
