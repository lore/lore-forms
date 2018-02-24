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
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: '500' }}>
          {`Create ${_.capitalize(modelName)}`}
        </div>
        <div style={{ padding: '0px 20px', fontSize: '16px', color: 'rgba(0,0,0,0.67)' }}>
          {`${_.capitalize(modelName)} created!`}
        </div>
        <div style={{ padding: '20px', textAlign: 'right' }}>
          <button
            className="btn btn-primary"
            onClick={callbacks.onResetWizard}
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

});
