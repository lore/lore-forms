import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle } from 'material-ui';
import SchemaForm from './SchemaTemplate';
import Overlay from './_common/Overlay';
import Request from './_common/Request';
import RequestError from './_common/RequestError';
import SuccessMessage from './_common/SuccessMessage';
import _result from '../_result';

export default createReactClass({
  displayName: 'OverlayTemplate',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    request: PropTypes.object,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    formMap: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      key: 0,
      isSaving: false,
      showSuccessMessage: false,
      hasError: false,
      request: null,
      data: this.props.data || {
        userId: null,
        text: ''
      }
    }
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return _result(config.props, this.props);
  },

  onResetForm: function() {
    const { key } = this.state;
    const initialData = this.getInitialState().data;

    this.setState({
      key: key + 1,
      data: initialData
    });
  },

  onSubmit: function() {
    const { data } = this.state;

    const {
      request
    } = this.getTemplateProps();

    this.setState({
      isSaving: true,
      showSuccessMessage: false,
      hasError: false,
      request: request(data)
    });
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  onRequestSuccess: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false
    });
    this.onResetForm();
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
  },

  render: function() {
    const {
      schema,
      formMap,
      fieldMap,
      actionMap,
      config
    } = this.props;

    const {
      key,
      data,
      request,
      isSaving,
      showSuccessMessage,
      hasError
    } = this.state;

    const callbacks = {
      onSubmit: this.onSubmit
    };

    const {
      reducer
    } = this.getTemplateProps();

    const requestProps = {
      request: request,
      reducer: reducer,
      onSuccess: this.onRequestSuccess,
      onError: this.onRequestError
    };

    return (
      <Overlay key={key} isVisible={isSaving}>
        <Card className="form-card">
          <CardTitle
            title="Create Tweet"
            subtitle="Enter text and select the user to tweet it"
          />
          {(request && isSaving) ? (
            <Request {...requestProps} />
          ) : null}
          {showSuccessMessage ? (
            <SuccessMessage
              title="Success!"
              message="Tweet posted."
            />
          ) : null}
          {hasError ? (
            <RequestError request={request}>
              {(request) => {
                return request.error.message;
              }}
            </RequestError>
          ) : null}
          <SchemaForm
            key={key}
            data={data}
            // validators={validators}
            onChange={this.onChange}
            callbacks={callbacks}
            schema={schema}
            formMap={formMap}
            fieldMap={fieldMap}
            actionMap={actionMap}
            config={config}
          />
        </Card>
      </Overlay>
    );
  }

});
