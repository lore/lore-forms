/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';

import { FormSection, PropBarrier } from 'lore-react-forms';
import { FlatButton, RaisedButton, Stepper, Step, StepLabel } from 'material-ui';

import CreateDefaultBlueprint from './blueprints/create.default';
import CreateOverlayBlueprint from './blueprints/create.overlay';
import CreateWizardBlueprint from './blueprints/create.wizard';

import UpdateDefaultBlueprint from './blueprints/update.default';
import UpdateOverlayBlueprint from './blueprints/update.overlay';
import UpdateWizardBlueprint from './blueprints/update.wizard';

import DestroyDefaultBlueprint from './blueprints/destroy.default';
import DestroyOverlayBlueprint from './blueprints/destroy.overlay';
import DestroyWizardBlueprint from './blueprints/destroy.wizard';

import text2 from './fields/text2';
import password2 from './fields/password2';
import select2 from './fields/select2';
import checkbox2 from './fields/checkbox2';
import custom2 from './fields/custom2';

import {
  // Templates
  SchemaTemplate,
  OverlayTemplate,
  WizardTemplate,
  CustomTemplate,

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

    custom2: custom2,

    text: (form, props, name) => {
      return (
        <TextField
          name={name}
          props={props}
        />
      );
    },

    text2: text2,

    password: (form, props, name) => {
      return (
        <PasswordField
          name={name}
          props={props}
        />
      );
    },

    password2: password2,

    checkbox: (form, props, name) => {
      return (
        <CheckboxField
          name={name}
          props={props}
        />
      );
    },

    checkbox2: checkbox2,

    select: function(form, props, name) {
      // const {
      //   getOptions,
      //   ...other
      // } = props;
      //
      // return (
      //   <Connect callback={getOptions}>
      //     <SelectField
      //       name={name}
      //       props={other}
      //     />
      //   </Connect>
      // );

      const {
        options,
        ...other
      } = props;

      return (
        <Connect callback={(getState, props) => {
          return {
            options: _.isFunction(options) ? options(getState, props) : options
          }
        }}>
          <SelectField
            name={name}
            {...other}
          />
        </Connect>
      );
    },

    select2: select2,

    autocomplete: (form, props, name) => {
      const {
        options,
        ...other
      } = props;

      // return (
      //   <Connect callback={getOptions}>
      //     <AutoCompleteField
      //       name={name}
      //       {...other}
      //     />
      //   </Connect>
      // );

      return (
        <Connect callback={(getState, props) => {
          return {
            options: _.isFunction(options) ? options(getState, props) : options
          }
        }}>
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
  }
}
