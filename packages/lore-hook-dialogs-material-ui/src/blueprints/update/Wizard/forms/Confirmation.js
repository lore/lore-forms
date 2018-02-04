import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { CardTitle, RaisedButton, FlatButton } from 'material-ui';

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
        <CardTitle title={`Update ${_.capitalize(modelName)}`} />
        <div className="mui-card-text">
          <div className="row">
            <div className="col-md-12">
              <div style={{ fontSize: '16px', color: 'rgba(0,0,0,0.67)' }}>
                {`${_.capitalize(modelName)} updated!`}
              </div>
            </div>
          </div>
        </div>
        <div className="mui-card-actions">
          <RaisedButton
            label="Close"
            primary={true}
            onClick={callbacks.onCancel}
          />
        </div>
      </div>
    );
  }

});