import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.wizard.request.hook',

  getInitialState: function() {
    return {
      stepIndex: 0,
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

    return lore.forms.tweet.wizard();
  }

});
