import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import FormSection from '../components/FormSection';

export default createReactClass({
  displayName: 'SchemaFields',

  propTypes: {
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      fields: []
    }
  },

  render: function () {
    const {
      schema,
      fieldMap,
      form,
      fields
    } = this.props;

    return (
      <FormSection data={form.data} onChange={form.onChange} errors={form.errors}>
        {schema.fields(form)(
          fields.map((field, index) => {
            const key = field.key;
            const mappedField = fieldMap[field.type];
            if (!key) {
              throw new Error(`Must provide a key for field of type "${field.type}"`);
            }
            if (!mappedField) {
              throw new Error(`There is no fieldMap entry for "${field.type}". Valid options are ${Object.keys(fieldMap).join(', ')}.`);
            }
            const fieldProps = _result(field.props, form);
            return (
              React.cloneElement(schema.field(form)(
                mappedField(form, fieldProps, key),
                fieldProps
              ), {
                key: key
              })
            );
          })
        )}
      </FormSection>
    );
  }

});
