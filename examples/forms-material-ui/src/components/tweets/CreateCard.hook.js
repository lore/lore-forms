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

  onSubmit: function() {
    var params = _.omit(this.state, ['tweet']);
    var action = lore.actions.tweet.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      tweet: action.payload
    });
  },

  getOptions: function(getState, props) {
    return {
      options: getState('user.find')
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  getForm: function() {
    var data = _.omit(this.state, ['tweet']);
    var validators = this.getValidators(data);

    return (
      <SchemaForm
        data={data}
        validators={validators}
        onChange={this.onChange}
        callbacks={{
          onSubmit: this.onSubmit
        }}
        schema={lore.config.forms.schemas.default}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={{
          fields: [
            {
              type: 'text',
              props: (form) => {
                return {
                  floatingLabelText: "Text",
                  style: { width: '100%' },
                  name: "text",
                  multiLine: true
                };
              }
            },
            {
              type: 'autocomplete',
              props: (form) => {
                return {
                  floatingLabelText: "User",
                  name: "userId",
                  getOptions: this.getOptions,
                  field: "username"
                };
              }
            }
          ],
          actions: [
            {
              type: 'submit',
              props: (form) => {
                return {
                  label: "Save",
                  primary: true,
                  onTouchTap: form.callbacks.onSubmit
                }
              }
            }
          ]
        }}
      />
    );
  },

  render: function() {
    const { tweet } = this.state;

    return lore.forms.tweet.create({
      template: 'default',
      reducer: 'tweet',
      action: 'tweet'
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
