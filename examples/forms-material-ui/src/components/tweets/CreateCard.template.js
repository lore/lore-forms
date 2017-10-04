import React from 'react';
import { Card, CardTitle } from 'material-ui';
import _ from 'lodash';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';

// Hook Dialogs
import withMuiTheme from '../../decorators/withMuiTheme';
import validators from '../../utils/validators';
import Template from '../templates/Template';
import Overlay from '../common/Overlay';

import tweetConfig from '../../models/tweet';

export default React.createClass({
  displayName: 'CreateCard.template',

  getInitialState: function() {
    return {
      tweet: null,
      userId: null,
      text: ''
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var tweet = this.state.tweet;

    if (!tweet) {
      return;
    }

    var nextTweet = lore.store.getState().tweet.byCid[tweet.cid];

    if (nextTweet.state === PayloadStates.RESOLVED) {
      this.setState({
        tweet: null
      })
    } else {
      this.setState({
        tweet: nextTweet
      })
    }
  },

  onSubmit: function(params) {
    var action = lore.actions.tweet.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      tweet: action.payload
    });
  },

  getForm: function() {
    var data = this.state;
    var templateProps = _.merge({}, tweetConfig.forms, {
      fields: {
        text: {
          data: data.text
        },
        userId: {
          data: data.userId
        }
      },
      onSubmit: this.onSubmit
    });

    return (
      <Template {...templateProps} />
    );
  },

  render: function() {
    var tweet = this.state.tweet;

    return (
      <Overlay model={tweet}>
        <Card className="form-card">
          <CardTitle
            title="Template Form"
            subtitle="Created by providing a config to the template used by the forms hook" />
          {this.getForm()}
        </Card>
      </Overlay>
    );
  }
});
