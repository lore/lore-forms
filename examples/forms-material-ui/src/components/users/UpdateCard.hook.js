import React from 'react';
import PropTypes from 'prop-types';

export default React.createClass({
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
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: user,
      onSubmit: this.onSubmit
    });
  }
});
