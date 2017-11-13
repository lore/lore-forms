import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.overlay.hook',

  getInitialState: function() {
    return {
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

    return lore.forms.tweet.overlay();
  }

});
