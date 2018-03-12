import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';
import { Overlay, Request, RequestError, SuccessMessage } from 'lore-react-forms-bootstrap';

export default createReactClass({
  displayName: 'Overlay',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired
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
    const { request } = this.props;
    return request ? request(data) : lore.actions[modelName].create(data).payload;
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

  onRequestSuccess: function (request) {
    this.setState({
      key: this.state.key + 1,
      data: this.getInitialState().data,
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false
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
    const { modelName } = this.props;
    const {
      title = `Create ${_.capitalize(modelName)}`,
      description = '',
      successMessage = `${_.capitalize(modelName)} created.`,
      schema,
      fieldMap,
      actionMap,
      fields,
      actions
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
          <div className="modal-header">
            {title ? (
              <h4 className="modal-title">
                {title}
              </h4>
            ) : null}
            {description ? (
              <p className="help-block">
                {description}
              </p>
            ) : null}
            {showSuccessMessage ? (
              <SuccessMessage
                title="Success!"
                message={successMessage}
              />
            ) : null}
            {hasError ? (
              <RequestError request={request}>
                {(request) => {
                  return request.error;
                }}
              </RequestError>
            ) : null}
          </div>
          {(request && isSaving) ? (
            <Request {...requestProps} />
          ) : null}
          <SchemaForm
            key={key}
            data={data}
            validators={validators}
            onChange={this.onChange}
            callbacks={{
              onSubmit: this.onSubmit
            }}
            schema={schema}
            fieldMap={fieldMap}
            actionMap={actionMap}
            fields={fields || {}}
            actions={actions || []}
          />
        </div>
      </Overlay>
    );
  }

});
