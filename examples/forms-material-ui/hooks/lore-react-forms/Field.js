/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Field extends React.Component {

  constructor(props) {
    super(props);
    // const value = props.data[props.name];
    this.state = {
      // value: value,
      touched: false
    };
    this.onChange = _.bind(this.onChange, this);
    this.onFocus = _.bind(this.onFocus, this);
    this.onBlur = _.bind(this.onBlur, this);
  }

  onChange(event, value) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, value);
  }

  onFocus() {
    // no op
  }

  onBlur() {
    this.setState({
      touched: true
    });
  }

  render() {
    // const name = this.props.name;
    // const error = this.props.errors[name];
    // const validators = this.props.validators[name];
    // const value = this.props.data[name];

    const {
      name,
      data,
      validators,
      errors,
      hasError,
      children
    } = this.props;

    const {
      touched
    } = this.state;

    if (_.isFunction(children)) {
      return children({
        name: name,
        data: data,
        value: data[name],
        validators: validators,
        errors: errors,
        error: errors[name],
        hasError: hasError,
        touched: touched,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      });
    }

    return (
      <div>{value}</div>
    );
  }

}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  validators: PropTypes.object.isRequired
};

Field.defaultProps = {
  name: '',
  data: {},
  validators: {},
  errors: {},
  onChange: function() {}
};

export default Field;
