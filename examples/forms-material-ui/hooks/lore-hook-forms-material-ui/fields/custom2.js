import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

export default function(form, props, name) {
  return (
    <Field name={name}>
      {(field) => {
        return props.render(field, props);
      }}
    </Field>
  );
}
