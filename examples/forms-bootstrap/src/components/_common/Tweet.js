import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';

export default lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
createReactClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  },

  onClick: function() {
    const { tweet, onClick } = this.props;
    onClick(tweet);
  },

  render: function() {
    const tweet = this.props.tweet;
    const user = this.props.user;
    const timestamp = moment.unix(tweet.data.createdAt).fromNow().split(' ago')[0];

    return (
      <a className="list-group-item tweet clickable" onClick={this.onClick}>
        <div className="image-container">
          <img
            className="img-circle avatar"
            src={user.data.avatar} />
        </div>
        <div className="content-container">
          <h4 className="list-group-item-heading title">
            {user.data.name}
          </h4>
          <h4 className="list-group-item-heading timestamp">
            {'- ' + timestamp}
          </h4>
          <p className="list-group-item-text text">
            {tweet.data.text}
          </p>
        </div>
      </a>
    );
  }

})
);
