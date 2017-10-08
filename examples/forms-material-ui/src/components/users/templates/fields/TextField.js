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
      errorText,
      ...other
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;

    return (
      <MuiTextField
        {..._.omit(other, ['validators', 'element', 'hasError', 'initialValue'])}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && (errors[name] || errorText)}
      />
    );
  }

}

export default TextField;
