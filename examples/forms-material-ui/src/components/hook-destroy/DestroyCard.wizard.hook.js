import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { PayloadStates } from 'lore-utils';

export default createReactClass({
  displayName: 'DestroyCard.wizard.hook',

  propTypes: {
    model: PropTypes.object.isRequired
  },

  render: function() {
    const { model } = this.props;

    if (model.state === PayloadStates.NOT_FOUND) {
      return (
        <h4>Tweet does not exist.</h4>
      );
    }

    return lore.forms.tweet.destroy(model, {
      template: 'wizard'
    });
  }

});
