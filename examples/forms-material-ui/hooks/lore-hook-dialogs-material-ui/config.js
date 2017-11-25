/* eslint no-param-reassign: "off" */

import React from 'react';

import { FormSection, PropBarrier } from 'lore-react-forms';
import { FlatButton, RaisedButton, Stepper, Step, StepLabel, CardText, CardActions } from 'material-ui';

import CreateDefaultBlueprint from './blueprints/create.default';
import CreateOverlayBlueprint from './blueprints/create.overlay';
import CreateWizardBlueprint from './blueprints/create.wizard';

import UpdateDefaultBlueprint from './blueprints/update.default';
import UpdateOverlayBlueprint from './blueprints/update.overlay';
import UpdateWizardBlueprint from './blueprints/update.wizard';

import DestroyDefaultBlueprint from './blueprints/destroy.default';
import DestroyOverlayBlueprint from './blueprints/destroy.overlay';
import DestroyWizardBlueprint from './blueprints/destroy.wizard';

import SchemaTemplate from './templates/SchemaTemplate';
import OverlayTemplate from './templates/OverlayTemplate';
import WizardTemplate from './templates/WizardTemplate';
import CustomTemplate from './templates/CustomTemplate';

import {
  // Templates
  // SchemaTemplate,
  // OverlayTemplate,
  // WizardTemplate,
  // CustomTemplate,

  // Forms
  SchemaForm,
  WizardForm,
  RequestForm,
  WizardRequestForm,
  CustomForm,

  // Fields
  TextField,
  PasswordField,
  SelectField,
  AutoCompleteField,
  CheckboxField,
  // MarkdownField,
  CustomField
} from '../lore-react-forms-material-ui';

import { Connect } from 'lore-hook-connect';

export default {
  defaultTemplate: 'default',
  defaultSchema: 'default',

  templates: {
    default: SchemaTemplate,
    overlay: OverlayTemplate,
    wizard: WizardTemplate,
    custom: CustomTemplate
  },

  blueprints: {
    create: {
      default: CreateDefaultBlueprint,
      overlay: CreateOverlayBlueprint,
      wizard: CreateWizardBlueprint
    },
    destroy: {
      default: DestroyDefaultBlueprint,
      overlay: DestroyOverlayBlueprint,
      wizard: DestroyWizardBlueprint
    },
    update: {
      default: UpdateDefaultBlueprint,
      overlay: UpdateOverlayBlueprint,
      wizard: UpdateWizardBlueprint
    }
  },

  schemas: {
    default: {
      // stepper: (step) => {
      //   return (steps) => {
      //     return (
      //       <Stepper activeStep={0}>
      //         {steps}
      //       </Stepper>
      //     );
      //   };
      // },
      // step: (step) => {
      //   return (step) => {
      //     return (
      //       <Step {...this.props}>
      //         <StepLabel>
      //           {step.name}
      //         </StepLabel>
      //       </Step>
      //     );
      //   };
      // },
      fields: (form) => {
        return (fields) => {
          return (
            <FormSection style={{ padding: 16, position: 'relative' }}>
              {fields}
            </FormSection>
          );
        };
      },
      field: (form) => {
        return (field) => {
          return (
            <FormSection>
              {field}
            </FormSection>
          );
        }
      },
      actions: (form) => {
        return (actions) => {
          return (
            <FormSection style={{ padding: 8, position: 'relative', textAlign: 'right' }}>
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

  formMap: {
    form: (props) => {
      return (
        <SchemaForm {...props} />
      );
    },
    wizard: (props) => {
      return (
        <WizardForm {...props} />
      );
    },
    request: (props) => {
      return (
        <RequestForm {...props} />
      );
    },
    wizardRequest: (props) => {
      return (
        <WizardRequestForm {...props} />
      );
    },
    custom: (props) => {
      return (
        <CustomForm {...props} />
      );
    }
  },

  fieldMap: {
    custom: (form, props, name) => {
      return (
        <CustomField
          name={name}
          props={props}
        />
      );
    },

    text: (form, props, name) => {
      return (
        <TextField
          name={name}
          props={props}
        />
      );
    },

    password: (form, props, name) => {
      return (
        <PasswordField
          name={name}
          props={props}
        />
      );
    },

    checkbox: (form, props, name) => {
      return (
        <CheckboxField
          name={name}
          props={props}
        />
      );
    },

    select: function(form, props, name) {
      const {
        getOptions,
        ...other
      } = props;

      return (
        <Connect callback={getOptions}>
          <SelectField
            name={name}
            props={other}
          />
        </Connect>
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
            props={other}
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
  }
}
