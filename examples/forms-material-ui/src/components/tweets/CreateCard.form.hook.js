import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.form.hook',

  getInitialState: function() {
    return {
      key: 0,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  render: function() {
    const {
      data
    } = this.state;

    return lore.forms.tweet.default();
  }

});
