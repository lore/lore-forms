import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.hook',

  render: function() {
    return lore.forms.tweet.create({
      template: 'overlayCard',
      // callbacks: {
      //   onSubmit: this.onSubmit
      // }
    });
  }

});
