import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';
import { Overlay, Request, RequestError, SuccessMessage } from 'lore-react-forms-material-ui';

export default createReactClass({
  displayName: 'Create.Overlay',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    modelName: PropTypes.string.isRequired
  },

  getInitialState: function() {
    const { data } = this.props;

    return {
      key: 0,
      data: data || {},
      isSaving: false,
      showSuccessMessage: false,
      hasError: false,
      request: null,
    };
  },

  request: function(data) {
    const { modelName } = this.props;
    return lore.actions[modelName].create(data).payload;
  },

  onSubmit: function () {
    const { data } = this.state;

    this.setState({
      isSaving: true,
      showSuccessMessage: false,
      hasError: false,
      request: this.request(data, this)
    });
  },

  onCancel: function() {
    this.props.onCancel();
  },

  onRequestSuccess: function (request) {
    this.setState({
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false,
      key: this.state.key + 1,
      data: this.getInitialState().data
    });
  },

  onRequestError: function (request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
  },

  onChange: function(name, value) {
    const nextData = _.merge({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  getValidators: function(data) {
    const { validators } = this.props;
    return _result(validators || {}, data);
  },

  render: function() {
    const {
      schema,
      fieldMap,
      actionMap,
      config,
      modelName
    } = this.props;

    const {
      key,
      data,
      request,
      isSaving,
      showSuccessMessage,
      hasError
    } = this.state;

    const validators = this.getValidators(data);

    const requestProps = {
      request: request,
      reducer: modelName,
      onSuccess: this.onRequestSuccess,
      onError: this.onRequestError
    };

    return (
      <Overlay isVisible={isSaving}>
        <div>
          {(request && isSaving) ? (
            <Request {...requestProps} />
          ) : null}
          {showSuccessMessage ? (
            <SuccessMessage
              title="Success!"
              message={`${_.capitalize(modelName)} created.`}
            />
          ) : null}
          {hasError ? (
            <RequestError request={request}>
              {(request) => {
                return request.error;
              }}
            </RequestError>
          ) : null}
          <SchemaForm
            key={key}
            data={data}
            validators={validators}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            callbacks={{
              onSubmit: this.onSubmit,
              onCancel: this.onCancel
            }}
            schema={schema}
            fieldMap={fieldMap}
            actionMap={actionMap}
            config={_.merge({
              fields: {},
              actions: []
            }, config)}
          />
        </div>
      </Overlay>
    );
  }

});
