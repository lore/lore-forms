import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { Connect } from 'lore-hook-connect';

export default function(form, props, name) {
  const {
    options,
    label,
    optionLabel,
    description,
    ...other
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
            <Connect callback={(getState, props) => {
              return {
                options: _.isFunction(options) ? options(getState, props) : options
              };
            }}>
              {(connect) => {
                return (
                  <select
                    className="form-control"
                    value={field.value || ''}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onBlur();
                      field.onChange(field.name, value ? Number(value) : value);
                    }}
                    style={{ width: '100%' }}
                    {...other}
                  >
                    {[<option key="" value=""/>].concat(connect.options.data.map((datum) => {
                      return (
                        <option key={datum.id} value={datum.id}>
                          {_.isFunction(optionLabel) ? optionLabel(datum) : datum.data[optionLabel]}
                        </option>
                      );
                    }))}
                  </select>
                )
              }}
            </Connect>
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
        )
      }}
    </Field>
  )
}
