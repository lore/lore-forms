import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import PayloadStates from '../../constants/PayloadStates';

import Spinner from './Spinner';
import Tweet from './Tweet';

export default lore.connect(function(getState, props){
  return {
    newTweets: getState('tweet.all', {
      where: function(tweet) {
        return !tweet.id || (tweet.data.createdAt - lore.timestamp) > 0
      },
      sortBy: function(tweet) {
        return -tweet.data.createdAt;
      }
    }),
    tweets: getState('tweet.find', {
      where: {
        createdAt_lte: lore.timestamp,
        _sort: 'createdAt',
        _order: 'DESC'
      }
    })
  }
})(
withRouter(createReactClass({
  displayName: 'List',

  propTypes: {
    tweets: PropTypes.object.isRequired,
    newTweets: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  },

  renderTweet: function(tweet) {
    const { onClick } = this.props;
    return (
      <Tweet
        key={tweet.id || tweet.cid}
        value={tweet.id || tweet.cid}
        tweet={tweet}
        nestedItems={[]}
        onClick={onClick}
      />
    );
  },

  render: function() {
    const tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    const newTweets = this.props.newTweets.data.map(this.renderTweet);

    return (
      <div>
        <div className="media-list tweets list-group">
          {newTweets}
          {tweets.data.map(this.renderTweet)}
        </div>
      </div>
    );
  }

}))
);
