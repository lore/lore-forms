import React from 'react';
import createReactClass from 'create-react-class';
import FormTemplate from '../../forms/_templates/FormTemplate';
import formConfig from '../../forms/tweet/default';

export default createReactClass({
  displayName: 'CreateCard.form.config.2',

  getInitialState: function() {
    return {
      data: {
        userId: null,
        text: ''
      }
    }
  },

  render: function() {
    const {
      data
    } = this.state;

    return (
      <FormTemplate
        data={data}
        // validators={validators}
        // onChange={this.onChange}
        // callbacks={callbacks}
        schema={lore.config.forms.schemas.default}
        formMap={lore.config.forms.formMap}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={formConfig}
      />
    );
  }

});
