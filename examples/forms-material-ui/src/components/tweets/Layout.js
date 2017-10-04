import React from 'react';
import PayloadStates from '../../constants/PayloadStates';
import CreateCardForm from './CreateCard.form';
import CreateCardTemplate from './CreateCard.template';
import CreateCardHook from './CreateCard.hook';
import CustomCreateCardHook from './CreateCard.hook.custom';
import UpdateCardForm from './UpdateCard.form';
import UpdateCardTemplate from './UpdateCard.template';
import CustomUpdateCardTemplate from './UpdateCard.template.custom';
import UpdateCardHook from './UpdateCard.hook';
import CustomUpdateCardHook from './UpdateCard.hook.custom';
import List from './List';
import Connect from '../Connect';
import Spinner from '../Spinner';

export default React.createClass({
  displayName: 'Layout',

  getTweet: function(getState, props) {
    var tweetId = this.props.params.tweetId;

    return {
      tweet: getState('tweet.byId', {
        id: tweetId
      }),
      users: getState('user.find')
    }
  },

  shouldDisplaySpinner: function(tweetId) {
    var tweetId = this.props.params.tweetId;
    var tweet = lore.getState('tweet.byId', {
      id: tweetId
    });
    var users = lore.getState('user.find');
    return (
      tweet.state === PayloadStates.FETCHING ||
      users.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    var tweetId = this.props.params.tweetId;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {tweetId ? "Update" : "Create"}
          </h2>
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardForm key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardForm /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardTemplate key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardTemplate /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <CustomUpdateCardTemplate key={tweetId} />
              </Spinner>
            </Connect>
          ) : null }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardHook key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardHook /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <CustomUpdateCardHook key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CustomCreateCardHook /> }
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});
