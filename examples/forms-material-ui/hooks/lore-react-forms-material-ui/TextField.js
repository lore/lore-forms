import React from 'react';
import { TextField as MuiTextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class TextField extends Field {

  render() {
    const {
      name,
      data,
      errors,
      props
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;

    return (
      <MuiTextField
        name={name}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && errors[name]}
        {...props}
      />
    );
  }

}

export default TextField;
