import React from 'react';
import { Card, CardTitle } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';
import validators from '../../utils/validators';
import Overlay from '../_common/Overlay';
import TemplateSchemaForm from '../_common/TemplateSchemaForm';
import formConfig from '../../forms/tweet/create';
import Request from '../_common/Request';

export default createReactClass({
  displayName: 'CreateCard.hook',

  getInitialState: function() {
    return {
      request: null,
      isSaving: false,
      data: {
        text: '',
        userId: null
      }
    }
  },

  onRequestSuccess: function() {
    this.setState({
      isSaving: false,
      request: null
    });
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request
    });
  },

  onSubmit: function() {
    const {
      data
    } = this.state;

    this.setState({
      request: lore.actions.tweet.create(_.extend({
        createdAt: moment().unix()
      }, data))
    });
  },

  onChange: function(name, value) {
    const nextData = _.extend({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  render: function() {
    const {
      request,
      isSaving,
      data
    } = this.state;
    const validators = formConfig.validators(data);

    return (
      <Overlay isSaving={isSaving}>
        <Request
          request={request}
          reducer="tweet"
          onSuccess={this.onRequestSuccess}
          onError={this.onRequestError}
        >
          <div/>
        </Request>
        <TemplateSchemaForm
          data={data}
          validators={validators}
          onChange={this.onChange}
          callbacks={{
            onSubmit: this.onSubmit
          }}
          schema={lore.config.forms.schemas.default}
          fieldMap={lore.config.forms.fieldMap}
          actionMap={lore.config.forms.actionMap}
          config={formConfig}
        />
      </Overlay>
    );
  }

});
