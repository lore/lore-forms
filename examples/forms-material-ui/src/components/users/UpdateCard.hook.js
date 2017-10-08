import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'UpdateCard.hook',

  propTypes: {
    user: PropTypes.object
  },

  onSubmit: function(params) {
    var user = this.props.user;
    lore.actions.user.update(user, params);
  },

  render: function() {
    var user = this.props.user;

    return lore.forms.user.update(user, {
      template: 'card',
      title: 'Update User',
      subtitle: 'Edit the data for the user',
      model: user,
      onSubmit: this.onSubmit
    });
  }
});
