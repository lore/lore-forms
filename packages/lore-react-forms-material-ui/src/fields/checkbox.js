import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { Checkbox } from 'material-ui';

export default function(form, props, name) {
  return (
    <Field name={name}>
      {(field) => {
        return (
          <Checkbox
            checked={field.value}
            onCheck={(event, checked) => {
              field.onBlur();
              field.onChange(field.name, checked);
            }}
            style={{ width: '100%' }}
            {...props}
          />
        )
      }}
    </Field>
  );
}
