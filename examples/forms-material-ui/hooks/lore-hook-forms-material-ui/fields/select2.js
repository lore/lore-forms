import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { SelectField, MenuItem } from 'material-ui';
import { Connect } from 'lore-hook-connect';

export default function(form, props, name) {
  const {
    options,
    field,
    ...other
  } = props;

  function mapDatumToOption(datum) {
    return {
      value: datum.id,
      text: datum.data[field]
    };
  }

  function mapDataToOptions(data) {
    return data.map(mapDatumToOption);
  }

  function renderOption({ text, value }) {
    return (
      <MenuItem
        key={value}
        value={value}
        primaryText={text}
      />
    );
  }

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
                  floatingLabelText="User"
                  value={field.value}
                  onChange={(event, key, value) => {
                    field.onBlur();
                    field.onChange(field.name, value);
                  }}
                  errorText={field.touched && field.error}
                  style={{ width: '100%' }}
                >
                  {[renderOption({ value: null, text: '' })].concat(
                    mapDataToOptions(connect.options.data).map(renderOption)
                  )}
                </SelectField>
              )
            }}
          </Connect>
        )
      }}
    </Field>
  )
}
