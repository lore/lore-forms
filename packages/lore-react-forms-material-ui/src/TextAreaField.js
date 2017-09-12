import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class TextAreaField extends Field {

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    const value = this.props.data[name];
    const touched = this.state.touched;
    const hintText = this.props.hintText;
    const label = this.props.label;
    const disabled = this.props.disabled;

    const style = _.assign({}, { width: '100%' }, this.props.style);

    return (
      <TextField
        style={style}
        floatingLabelText={label}
        floatingLabelFixed={false}
        hintText={hintText}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && error}
        disabled={disabled}
        multiLine={true}
      />
    );
  }

}

export default TextAreaField;