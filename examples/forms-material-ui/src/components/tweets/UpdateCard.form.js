import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Card, CardTitle, FlatButton, CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';

// Hook Dialogs
import validators from '../../utils/validators';
import Overlay from '../common/Overlay';

import { Form, FormSection, PropBarrier } from 'lore-react-forms';

import { TextField, AutoCompleteField } from 'lore-react-forms-material-ui';
import Connect from '../Connect';

export default lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
createReactClass({
  displayName: 'UpdateCard.form',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    var tweet = this.props.tweet;
    return {
      userId: tweet.data.userId,
      text: tweet.data.text
    }
  },

  onSubmit: function() {
    var tweet = this.props.tweet;
    var params = this.state;
    lore.actions.tweet.update(tweet, params);
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
    var data = this.state;
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
    var tweet = this.props.tweet;
    var user = this.props.user;

    return (
      <Overlay model={tweet}>
        <Card className="form-card">
          <CardTitle
            title="Component Form"
            subtitle="Created by manually building the form using React components" />
          {user.state === PayloadStates.RESOLVED ? this.getForm() : <CircularProgress />}
        </Card>
      </Overlay>
    );
  }

})
);
