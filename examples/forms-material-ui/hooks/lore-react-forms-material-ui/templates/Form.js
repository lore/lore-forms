/* global lore */
/* eslint arrow-parens: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, FormSection } from 'lore-react-forms';

/**
 * Fields:
 *
 * name
 * type
 * data
 * validators
 * onChange
 * fields
 * actions
 *
 */

class Template extends React.Component {

  constructor(props) {
    super(props);

    // React throws a warning about not being allowed to bind component methods
    [
      'onChange',
      'getValidators'
    ].forEach(function(methodName) {
      if (false && props[methodName]) {
        this[methodName] = props[methodName].bind(this);
      } else {
        this[methodName] = this[methodName].bind(this);
      }
    }.bind(this));

    this.state = _.mapValues(props.fields, function(value, key) {
      return value.data;
    });
  }

  getValidators(data) {
    // React throws a warning about not being allowed to bind component methods
    const { validators } = this.props;

    if (validators) {
      if (_.isFunction(validators)) {
        return validators(data);
      }
      return validators;
    }

    return _.mapValues(this.props.fields, function(value, key) {
      return _.isFunction(value.validators) ? value.validators(data) : value.validators;
    });
  }

  onChange(name, value) {
    // React throws a warning about not being allowed to bind component methods
    const { onChange } = this.props;
    if (onChange) {
      return onChange(name, value);
    }

    const state = {};
    state[name] = value;
    this.setState(state);
  }

  render() {
    const {
      Actions,
      Fields
    } = this.context.schema;

    const data = this.props.data || this.state;
    const validators = this.getValidators(data);
    const {
      // name,
      // type,
      // data,
      // validators,
      // onChange
      fields,
      actions
    } = this.props;

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}
        isSaving={this.props.isSaving}
        {..._.omit(this.props, ['data', 'fields', 'actions', 'validators'])}
      >
        {(form) => (
          <FormSection>
            <Fields
              fields={fields}
              form={form}
            />
            <Actions
              actions={actions}
              form={form}
            />
          </FormSection>
        )}
      </Form>
    );
  }

}

Template.propTypes = {
  onSubmit: PropTypes.func
};

Template.contextTypes = {
  schema: PropTypes.object
};

Template.defaultProps = {
  fields: {},
  actions: {},
  onSubmit: function() {}
};

export default Template;
