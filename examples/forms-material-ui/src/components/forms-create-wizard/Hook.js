import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  render: function() {
    return lore.forms.tweet.create({
      blueprint: 'wizard'
    });
  }
});
