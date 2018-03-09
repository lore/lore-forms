import React from 'react';
import createReactClass from 'create-react-class';
import config from './config';

export default createReactClass({
  render: function() {
    return lore.forms.tweet.create(config);
  }
});
