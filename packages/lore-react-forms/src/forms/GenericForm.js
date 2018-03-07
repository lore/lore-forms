import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import Form from '../components/Form';
import PropBarrier from '../components/PropBarrier';

export default createReactClass({
  displayName: 'GenericForm',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    callbacks: PropTypes.object,
    children: PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {};
  },

  onChange: function (name, value) {
    const {onChange} = this.props;

    if (onChange) {
      return onChange(name, value);
    }

    const state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function (data) {
    const { validators } = this.props;

    if (_.isFunction(validators)) {
      return validators(data);
    }
    return validators || {};
  },

  render: function () {
    const {
      callbacks,
      children
    } = this.props;
    const data = this.props.data || this.state;
    const validators = this.getValidators(data);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}
        callbacks={callbacks}>
        {(form) => (
          <PropBarrier>
            {children(form)}
          </PropBarrier>
        )}
      </Form>
    );
  }

});
