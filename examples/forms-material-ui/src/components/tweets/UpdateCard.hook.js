import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';

export default lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
React.createClass({
  displayName: 'UpdateCard.hook',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },

  onSubmit: function(params) {
    var tweet = this.props.tweet;
    lore.actions.tweet.update(tweet, params);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;

    if (user.state === PayloadStates.FETCHING) {
      return (
        <CircularProgress />
      );
    }

    return lore.forms.tweet.update(tweet, {
      template: 'card',
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }
})
);
