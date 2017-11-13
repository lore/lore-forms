import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import wizardConfig from '../../forms/tweet/wizard';
import WizardSchemaFormTemplate from '../../forms/_templates/WizardSchemaFormTemplate';
import WizardRequestTemplate from '../../forms/_templates/WizardRequestTemplate';
import CustomTemplate from '../../forms/_templates/CustomTemplate';

export default createReactClass({
  displayName: 'CreateCard.wizard.request',

  getInitialState: function() {
    return {
      stepIndex: 0,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  onResetWizard: function() {
    this.setState(this.getInitialState());
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  onNext: function() {
    console.log('onNext');
    this.setState({
      stepIndex: this.state.stepIndex + 1
    });
  },

  onPrevious: function() {
    console.log('onPrevious');
    this.setState({
      stepIndex: this.state.stepIndex - 1
    });
  },

  onRequestSuccess: function(request) {
    console.log('onRequestSuccess');
    this.setState({
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false
    });
    this.onNext();
  },

  onRequestError: function(request) {
    console.log('onRequestError');
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
    this.onPrevious();
  },

  render: function() {
    const {
      stepIndex,
      data,
      request
    } = this.state;

    const callbacks = {
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      onRequestSuccess: this.onRequestSuccess,
      onRequestError: this.onRequestError,
      onResetWizard: this.onResetWizard
    };

    if (stepIndex === 0) {
      return (
        <WizardSchemaFormTemplate
          data={data}
          onChange={this.onChange}
          request={request}
          callbacks={callbacks}
          schema={lore.config.forms.schemas.default}
          formMap={lore.config.forms.formMap}
          fieldMap={lore.config.forms.fieldMap}
          actionMap={lore.config.forms.actionMap}
          config={wizardConfig.steps[stepIndex]}
        />
      );
    }

    if (stepIndex === 1) {
      return (
        <WizardSchemaFormTemplate
          data={data}
          onChange={this.onChange}
          request={request}
          callbacks={callbacks}
          schema={lore.config.forms.schemas.default}
          formMap={lore.config.forms.formMap}
          fieldMap={lore.config.forms.fieldMap}
          actionMap={lore.config.forms.actionMap}
          config={wizardConfig.steps[stepIndex]}
        />
      );
    }

    if (stepIndex === 2) {
      return (
        <WizardRequestTemplate
          data={data}
          onChange={this.onChange}
          request={request}
          callbacks={callbacks}
          schema={lore.config.forms.schemas.default}
          formMap={lore.config.forms.formMap}
          fieldMap={lore.config.forms.fieldMap}
          actionMap={lore.config.forms.actionMap}
          config={wizardConfig.steps[stepIndex]}
        />
      );
    }

    if (stepIndex === 3) {
      return (
        <CustomTemplate
          data={data}
          onChange={this.onChange}
          request={request}
          callbacks={callbacks}
          schema={lore.config.forms.schemas.default}
          formMap={lore.config.forms.formMap}
          fieldMap={lore.config.forms.fieldMap}
          actionMap={lore.config.forms.actionMap}
          config={wizardConfig.steps[stepIndex]}
        />
      );
    }


  }

});
