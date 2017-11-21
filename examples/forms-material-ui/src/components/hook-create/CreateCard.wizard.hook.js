import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.wizard.request.hook',

  render: function() {
    return lore.forms.tweet.create({
      template: 'wizard'
    });
  }

});
