import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { CardTitle, CardText, CardActions, RaisedButton } from 'material-ui';

export default createReactClass({
  displayName: 'Confirmation',

  propTypes: {
    callbacks: PropTypes.object
  },

  render: function() {
    const { modelName } = this.props;

    const {
      title = `Update ${_.capitalize(modelName)}`,
      description = '',
      successMessage = `${_.capitalize(modelName)} updated.`,
      callbacks
    } = this.props;

    return (
      <div>
        <CardTitle
          title={title}
          subtitle={description}
        />
        <CardText>
          {successMessage}
        </CardText>
        <CardActions style={{ textAlign: 'right' }}>
          <RaisedButton
            label="Update Again"
            primary={true}
            onClick={callbacks.onResetWizard}
          />
        </CardActions>
      </div>
    );
  }

});
