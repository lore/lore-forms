import React from 'react';

// react-form
import { Form, FormSection, PropBarrier, Template } from 'lore-react-forms';

class CustomTemplate extends Template {

  renderField(name, field) {
    var Field = lore.config.forms.fields[field.type];

    return (
      <FormSection key={name} className="row">
        <FormSection className="col-md-12">
          {Field ? Field(name, field.options) : null}
        </FormSection>
      </FormSection>
    );
  }

  renderFields(dialog, form) {
    return (
      <FormSection className="mui-card-text">
        {this.getFields(dialog, form)}
      </FormSection>
    );
  }

  renderActions(dialog, form) {
    var actions = this.getActions(dialog, form);

    if (actions.length === 0) {
      return null;
    }

    return (
      <PropBarrier className="mui-card-actions">
        {actions}
      </PropBarrier>
    );
  }

}

export default CustomTemplate;
