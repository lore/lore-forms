import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class NumberField extends Field {

  onChange(event, value) {
    this.props.onChange(this.props.name, Number(value));
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

    // return (
    //   <Field render={() => {
    //     <TextField
    //       {...other}
    //       value={value}
    //       onChange={this.onChange}
    //       onFocus={this.onFocus}
    //       onBlur={this.onBlur}
    //       errorText={touched && (errors[name] || errorText)}
    //     />
    //   }} />
    // );
    
    return (
      <Field>
        {(field) => {
          return (
            <TextField
              {...other}
              value={field.data[field.name]}
              onChange={(event, value) => {
                field.onChange(field.name, Number(value))
              }}
              onFocus={field.onFocus}
              onBlur={field.onBlur}
              errorText={field.touched && (errors[name] || errorText)}
            />
          )
        }}
      </Field>
    );
  }

}

export default NumberField;
