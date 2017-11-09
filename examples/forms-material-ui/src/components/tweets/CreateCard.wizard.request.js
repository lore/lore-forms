import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.wizard.request',

  render: function() {
    return lore.forms.tweet.wizard({
      template: 'requestWizard',
      // callbacks: {
      //   onSubmit: this.onSubmit
      // }
    });
  }

});
