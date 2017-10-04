import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PayloadStates from '../../constants/PayloadStates';

import tweetConfig from '../../models/tweet';
import Template from '../templates/CardFormTemplate';

export default lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
React.createClass({
  displayName: 'CustomUpdateCard.template',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    var tweet = this.props.tweet;
    return {
      userId: tweet.data.userId,
      text: tweet.data.text
    }
  },

  onSubmit: function(params) {
    var params = this.state;
    var tweet = this.props.tweet;
    lore.actions.tweet.update(tweet, params);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var data = this.state;

    if (user.state === PayloadStates.FETCHING) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Template
        title="Custom Template Form"
        subtitle="Created by providing a config to a custom template"
        model={tweet}
        config={_.merge({}, tweetConfig.forms, {
          fields: {
            text: {
              data: data.text
            },
            userId: {
              data: data.userId
            }
          },
          onSubmit: this.onSubmit
        })} />
    );
  }

})
);
