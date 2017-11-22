import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ListItem, Avatar } from 'material-ui';
import _ from 'lodash';
import moment from 'moment';

let Tweet = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
withRouter(createReactClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  },

  onTouchTap: function() {
    var tweet = this.props.tweet;
    this.props.router.push('/hook/update/' + tweet.id);
    this.props.onClick.apply(arguments);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var timestamp = moment.unix(tweet.data.createdAt).fromNow().split(' ago')[0];

    // get the props from the SelectableList that need to be passed down
    var other = _.omit(this.props, ['user', 'tweet', 'router', 'params', 'location', 'routes']);

    return (
      <ListItem
        {...other}
        leftAvatar={<Avatar src={user.data.avatar} />}
        primaryText={(
          <span>
            <span>{user.data.username}</span>
            <span className="timestamp">- {timestamp}</span>
          </span>
        )}
        secondaryText={tweet.data.text}
        secondaryTextLines={2}
        onTouchTap={this.onTouchTap}
      />
    );
  }

}))
);

// we need to provide a muiName in order for SelectableList to recognize this component as a mui.ListItem
Tweet.muiName = 'ListItem';

export default Tweet;
