import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class PasswordField extends Field {

  render() {
    const {
      name,
      data,
      errors,
      errorText,
      ...other
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;

    return (
      <TextField
        {...other}
        type="password"
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && (errors[name] || errorText)}
      />
    );
  }

}

export default PasswordField;