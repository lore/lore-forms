import React from 'react';
import { Card, CardTitle, FlatButton } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';

// Hook Dialogs
// import withMuiTheme from '../../decorators/withMuiTheme';
import validators from '../../utils/validators';
// import Template = from '../../../hooks/lore-hook-forms-material-ui/Template';
import Overlay from '../common/Overlay';

import { Form, FormSection, PropBarrier } from 'lore-react-forms';

import { TextField, AutoCompleteField } from 'lore-react-forms-material-ui';
import Connect from '../Connect';

export default createReactClass({
  displayName: 'CreateCard.form',

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
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            <FormSection className="mui-card-text">
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    floatingLabelText="Text"
                    name="text"
                    multiLine={true}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={this.getOptions}>
                    <AutoCompleteField
                      floatingLabelText="User"
                      name="userId"
                      field="username"
                    />
                  </Connect>
                </FormSection>
              </FormSection>
            </FormSection>
            <FormSection className="mui-card-actions">
              <PropBarrier>
                <FlatButton
                  label="Save"
                  primary={true}
                  onTouchTap={this.onSubmit}
                />
              </PropBarrier>
            </FormSection>
          </FormSection>
        )}
      </Form>
    );
  },

  render: function() {
    var tweet = this.state.tweet;

    return (
      <Overlay model={tweet}>
        <Card className="form-card">
          <CardTitle
            title="Component Form"
            subtitle="Created by manually building the form using React components" />
          {this.getForm()}
        </Card>
      </Overlay>
    );
  }

});
