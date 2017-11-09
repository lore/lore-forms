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
  displayName: 'CreateCard.wizard',

  getInitialState: function() {
    return {
      request: null,
      userId: null,
      text: '',
      activeStep: 0
    }
  },

  onSubmit: function(data) {
    this.setState({
      request: lore.actions.tweet.create(data)
    })
  },

  onNext: function(data) {
    this.setState(data);
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  },

  onPrevious: function(data) {
    this.setState(data);
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  },

  render: function() {
    const {
      request
    } = this.state;

    return lore.forms.tweet.wizard({
      template: 'default',
      request: request,
      // stepIndex: activeStep,
      // template: 'wizard',
      // reducer: 'tweet',
      // action: 'tweet',
      // onChange: this.onChange,
      // data: data,
      callbacks: {
        onSubmit: this.onSubmit,
        // onNext: this.onNext,
        // onPrevious: this.onPrevious,
      }
    });
  }

});
