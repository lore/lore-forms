import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { SelectField, MenuItem } from 'material-ui';
import { Connect } from 'lore-hook-connect';

export default function(form, props, name) {
  const {
    options,
    optionLabel,
    ...other
  } = props;

  return (
    <Field name={name}>
      {(field) => {
        return (
          <Connect callback={(getState, props) => {
            return {
              options: _.isFunction(options) ? options(getState, props) : options
            };
          }}>
            {(connect) => {
              return (
                <SelectField
                  value={field.value}
                  onChange={(event, key, value) => {
                    field.onBlur();
                    field.onChange(field.name, value);
                  }}
                  errorText={field.touched && field.error}
                  style={{ width: '100%' }}
                  {...other}
                >
                  {connect.options.data.map((datum) => {
                    return (
                      <MenuItem
                        key={datum.id}
                        value={datum.id}
                        primaryText={_.isFunction(optionLabel) ? optionLabel(datum) : datum.data[optionLabel]}
                      />
                    );
                  })}
                </SelectField>
              )
            }}
          </Connect>
        )
      }}
    </Field>
  )
}
