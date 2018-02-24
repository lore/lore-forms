import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

export default function(form, props, name) {
  const {
    checked,
    label,
    description
  } = props;

  return (
    <Field name={name}>
      {(field) => {
        const errorText = field.touched && field.error;

        return (
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => {
                  field.onBlur();
                  field.onChange(field.name, event.target.checked);
                }}
              />
              {label}
            </label>
            {errorText ? (
              <span className="help-block">
                {errorText}
              </span>
            ) : null}
            <small className="form-text text-muted">
              {description}
            </small>
          </div>
        )
      }}
    </Field>
  );
}
