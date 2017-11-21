import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.overlay.hook',

  render: function() {
    return lore.forms.tweet.create({
      template: 'overlay'
    });
  }

});
