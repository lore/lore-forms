import React from 'react';
import createReactClass from 'create-react-class';
import moment from 'moment';

export default createReactClass({
  displayName: 'Hook',

  getInitialState: function() {
    return {
      key: 0,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  onSubmit: function(data) {
    lore.actions.tweet.create({
      userId: data.userId,
      text: data.text,
      createdAt: moment().unix()
    });
  },

  render: function() {
    const { key, data } = this.state;

    return lore.forms.tweet.create(_.extend({}, {
      onSubmit: this.onSubmit
    }));
  }

});
