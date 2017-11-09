/**
 * Configuration file for forms
 *
 * This file is where you define overrides for the default forms behavior.
 */
import React from 'react';
import _ from 'lodash';
import { FormSection, PropBarrier } from 'lore-react-forms';
import { FlatButton, RaisedButton, Step, StepLabel } from 'material-ui';
import {
  TextField,
//   PasswordField,
//   ConnectedSelectField,
  AutoCompleteField,
//   CheckboxField,
//   MarkdownField,
} from 'lore-react-forms-material-ui';
import Markdown from 'react-markdown';

import Connect from '../src/components/Connect';
import SchemaTemplate from '../hooks/lore-hook-forms-material-ui/SchemaForm';
import CardSchemaTemplate from '../src/forms/_templates/CardSchemaTemplate';
import OverlayCardSchemaTemplate from '../src/forms/_templates/OverlayCardSchemaTemplate';
import WizardSchemaTemplate from '../src/forms/_templates/WizardSchemaTemplate';
import RequestWizardSchemaTemplate from '../src/forms/_templates/RequestWizardSchemaTemplate';
import RequestTemplate from '../src/forms/_templates/RequestTemplate';

export default {

  templates: {
    // default: SchemaTemplate,
    card: CardSchemaTemplate,
    overlayCard: OverlayCardSchemaTemplate,
    wizard: WizardSchemaTemplate,
    requestWizard: RequestWizardSchemaTemplate,
    request: RequestTemplate
  },

  schemas: {
    default: {
      stepper: (step) => {
        return (steps) => {
          return (
            <Stepper activeStep={0}>
              {steps}
            </Stepper>
          );
        };
      },
      step: (step) => {
        return (step) => {
          return (
            <Step {...this.props}>
              <StepLabel>
                {step.name}
              </StepLabel>
            </Step>
          );
        };
      },
      fields: (form) => {
        return (fields) => {
          return (
            <FormSection className="mui-card-text">
              {fields}
            </FormSection>
          );
        };
      },
      field: (form) => {
        return (field) => {
          return (
            <FormSection className="row">
              <FormSection className="col-md-12">
                {field}
              </FormSection>
            </FormSection>
          );
        }
      },
      actions: (form) => {
        return (actions) => {
          return (
            <FormSection className="mui-card-actions">
              <PropBarrier>
                {actions}
              </PropBarrier>
            </FormSection>
          );
        };
      },
      action: (form) => {
        return (action) => {
          return (
            action
          );
        }
      }
    }
  },

  stepperMap: {
    stepper: () => {

    }
  },

  stepMap: {
    step: () => {

    }
  },

  formMap: {
    form: (schema, fieldMap, actionMap, callbacks, config, props, stepIndex) => {
      return (
        <SchemaTemplate
          schema={schema}
          fieldMap={fieldMap}
          actionMap={actionMap}
          callbacks={callbacks}
          config={config}
          {...props}
        />
      );
    },
    wizard: (schema, fieldMap, actionMap, callbacks, config, props, stepIndex) => {
      return (
        <WizardSchemaTemplate
          schema={schema}
          fieldMap={fieldMap}
          actionMap={actionMap}
          callbacks={callbacks}
          config={config}
          stepIndex={stepIndex}
          {...props}
        />
      );
    },
    request: (config, props) => {
      const {
        render,
        ...other
      } = props;

      return (
        <h1>spinning!</h1>
      );
    },
    custom: (config, props) => {
      const {
        render,
        ...other
      } = props;

      return render(other);
    }
  },

  fieldMap: {
    text: (form, props, name) => {
      return (
        <TextField
          name={name}
          props={props}
        />
      );
    },
    autocomplete: (form, props, name) => {
      const {
        getOptions,
        ...other
      } = props;

      return (
        <Connect callback={getOptions}>
          <AutoCompleteField
            name={name}
            {...other}
          />
        </Connect>
      );
    }
  },

  actionMap: {
    flat: (form, props) => {
      return (
        <FlatButton
          {...props}
        />
      )
    },
    raised: (form, props) => {
      return (
        <RaisedButton
          {...props}
        />
      )
    }
  },

  fields: {
    text: function(common, props) {
      const {
        description,
        ...other
      } = props;

      return (
        <FormSection>
          <TextField
            {...common}
            multiLine={true}
            style={{ width: '100%' }}
            {...other}
          />
          {description ? (
            <PropBarrier className="form-field-explanation">
              <div className="markdown-body">
                <Markdown source={description || ''} />
              </div>
            </PropBarrier>
          ) : null }
        </FormSection>
      );
    },
  },

  actions: {

  }

};
