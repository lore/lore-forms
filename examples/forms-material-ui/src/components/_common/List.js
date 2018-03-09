import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { Paper, Subheader } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';

import Spinner from './Spinner';
import SelectableList from './SelectableList';
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
    var tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    var newTweets = this.props.newTweets.data.map(this.renderTweet);

    return (
      <div>
        <Paper>
          <Subheader>
            Tweets
          </Subheader>
          <SelectableList defaultValue={0}>
            {newTweets}
            {tweets.data.map(this.renderTweet)}
          </SelectableList>
        </Paper>
      </div>
    );
  }

}))
);
