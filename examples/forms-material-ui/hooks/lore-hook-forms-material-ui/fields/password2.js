import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { TextField } from 'material-ui';

export default function(form, props, name) {
  return (
    <Field name={name}>
      {(field) => {
        return (
          <TextField
            type="password"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onFocus={field.onFocus}
            onBlur={field.onBlur}
            errorText={field.touched && field.error}
            {...props}
          />
        )
      }}
    </Field>
  );
}
