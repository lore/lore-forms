import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'Confirmation',

  propTypes: {
    callbacks: PropTypes.object
  },

  render: function() {
    const {
      callbacks,
      modelName
    } = this.props;

    return (
      <div>
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 className="modal-title">
            {`Update ${_.capitalize(modelName)}`}
          </h4>
        </div>
        <div className="modal-body" style={{ fontSize: '16px', color: 'rgba(0,0,0,0.67)' }}>
          {`${_.capitalize(modelName)} updated!`}
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
