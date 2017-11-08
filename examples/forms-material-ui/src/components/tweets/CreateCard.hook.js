import React from 'react';
import { Card, CardTitle } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';
import validators from '../../utils/validators';
import Overlay from '../_common/Overlay';
import SchemaForm from '../_common/SchemaForm';

export default createReactClass({
  displayName: 'CreateCard.hook',

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

  onSubmit: function(data) {
    // var params = _.omit(this.state, ['tweet']);
    var action = lore.actions.tweet.create(_.extend({
      createdAt: moment().unix()
    }, data));

    this.setState({
      tweet: action.payload
    });
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  render: function() {
    const {
      tweet,
      ...data
    } = this.state;

    return lore.forms.tweet.create({
      template: 'card',
      // reducer: 'tweet',
      // action: 'tweet',
      // onChange: this.onChange,
      // data: data,
      callbacks: {
        onSubmit: this.onSubmit
      }
    });

    // return (
    //   <Overlay model={tweet}>
    //     <Card className="form-card">
    //       <CardTitle
    //         title="Create Tweet"
    //         subtitle="Enter text and select the user to tweet it"
    //       />
    //       {this.getForm()}
    //     </Card>
    //   </Overlay>
    // );
  }

});
