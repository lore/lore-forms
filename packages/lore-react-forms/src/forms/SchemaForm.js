import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import Form from '../components/Form';
import FormSection from '../components/FormSection';

export default createReactClass({
  displayName: 'SchemaForm',

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

  getDefaultProps() {
    return {
      fields: {},
      actions: []
    }
  },

  getInitialState: function () {
    const { fields } = this.props;

    return _.mapValues(fields, function (value, key) {
      return value.initialValue;
    });
  },

  onChange: function (name, value) {
    const { onChange } = this.props;

    if (onChange) {
      return onChange(name, value);
    }

    const state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function (data) {
    const {
      validators,
      fields
    } = this.props;

    if (validators) {
      if (_.isFunction(validators)) {
        return validators(data);
      }
      return validators;
    }

    return _.mapValues(fields, function (value, key) {
      return _.isFunction(value.validators) ? value.validators(data) : value.validators;
    });
  },

  render: function () {
    const {
      // data,
      // validators,
      // onChange,
      onSubmit,
      callbacks,
      schema,
      fieldMap,
      actionMap,
      fields,
      actions
    } = this.props;

    const data = this.props.data || this.state;
    const validators = this.getValidators(data);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}
        onSubmit={onSubmit}
        callbacks={callbacks}>
        {(form) => (
          <FormSection>
            {schema.fields(form)(
              _.keys(fields).map((key, index) => {
                const field = fields[key];
                const mappedField = fieldMap[field.type];
                if (!mappedField) {
                  throw new Error(`There is no fieldMap entry for "${field.type}". Valid options are ${Object.keys(fieldMap).join(', ')}.`);
                }
                const fieldProps = _result(field.props, form);
                return (
                  React.cloneElement(schema.field(form)(
                    mappedField(form, fieldProps, key),
                    fieldProps
                  ), {
                    key: key
                  })
                );
              })
            )}
            {schema.actions(form)(
              actions.map((action, index) => {
                const mappedAction = actionMap[action.type];
                if (!mappedAction) {
                  throw new Error(`There is no actionMap entry for "${action.type}". Valid options are ${Object.keys(actionMap).join(', ')}.`);
                }
                const actionProps = _result(action.props, form);
                return (
                  React.cloneElement(schema.action(form)(
                    mappedAction(form, actionProps),
                    actionProps
                  ), {
                    key: index
                  })
                );
              })
            )}
          </FormSection>
        )}
      </Form>
    );
  }

});
