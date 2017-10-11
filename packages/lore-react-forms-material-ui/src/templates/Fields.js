import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { FormSection } from 'lore-react-forms';
import _ from 'lodash';

export default createReactClass({
  displayName: 'Fields',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const {
      Field
    } = this.context.template;

    const {
      data,
      errors,
      hasError,
      onChange,

      fields,
      form,
      ...other
    } = this.props;

    // field: initialValue, type, props (for component)

    return (
      <FormSection className="mui-card-text">
        {_.keys(fields).map((name, index) => {
          const field = fields[name];
          return (
            <FormSection key={name || index} className="row">
              <FormSection className="col-md-12">
                <Field
                  name={name}
                  data={data}
                  errors={errors}
                  hasError={hasError}
                  onChange={onChange}
                  form={form}
                  {...field}
                />
              </FormSection>
            </FormSection>
          );
        })}
      </FormSection>
    );
  }

});
