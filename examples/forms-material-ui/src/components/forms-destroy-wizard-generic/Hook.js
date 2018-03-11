import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import config from './config';

export default createReactClass({
  displayName: 'Hook',

  propTypes: {
    model: PropTypes.object.isRequired
  },

  render: function() {
    const { model } = this.props;

    return (
      <div key={model.id}>
        {lore.forms.tweet.destroy(model, config)}
      </div>
    );
  }

});
