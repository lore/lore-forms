import React from 'react';
import _ from 'lodash';
import { Checkbox } from 'material-ui';
import { Field } from 'lore-react-forms';

class CheckboxField extends Field {

  onChange(event, checked) {
    this.onBlur();
    this.props.onChange(this.props.name, checked);
  }

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
      <Checkbox
        {...other}
        checked={value}
        onCheck={this.onChange}
      />
    );
  }

}

export default CheckboxField;
