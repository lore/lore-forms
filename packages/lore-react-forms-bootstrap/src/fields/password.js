import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

export default function(form, props, name) {
  const {
    label,
    placeholder,
    description
  } = props;

  return (
    <Field name={name}>
      {(field) => {
        const errorText = field.touched && field.error;

        return (
          <div className={`form-group ${errorText ? 'has-error' : ''}`}>
            <label>
              {label}
            </label>
            <input
              type="password"
              className="form-control"
              name={field.name}
              value={field.value}
              onFocus={field.onFocus}
              onBlur={field.onBlur}
              placeholder={placeholder}
              onChange={(event) => {
                field.onChange(field.name, event.target.value)
              }}
            />
            {errorText ? (
              <span className="help-block">
                {errorText}
              </span>
            ) : null}
            {description ? (
              <span className="help-block">
                {description}
              </span>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
}
