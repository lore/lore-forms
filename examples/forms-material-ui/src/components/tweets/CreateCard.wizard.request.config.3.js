import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import wizardConfig from '../../forms/tweet/wizard';
import WizardTemplate from '../../forms/_templates/WizardTemplate';

export default createReactClass({
  displayName: 'CreateCard.wizard.request.config.3',

  getInitialState: function() {
    return {
      stepIndex: 0,
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
      <WizardTemplate
        schema={lore.config.forms.schemas.default}
        formMap={lore.config.forms.formMap}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={wizardConfig}
      />
    );
  }

});
