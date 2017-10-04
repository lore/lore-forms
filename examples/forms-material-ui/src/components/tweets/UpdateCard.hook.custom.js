import React from 'react';
import createReactClass from 'create-react-class';
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
createReactClass({
  displayName: 'CustomUpdateCard.hook',

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
      template: 'custom',
      title: 'Hook Form with Custom Template',
      footer: 'This is some footer text',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }
})
);
