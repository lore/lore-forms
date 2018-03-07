import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'Hook',

  render: function() {
    return lore.forms.tweet.create({
      blueprint: 'overlay'
    });
  }

});
