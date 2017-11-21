/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import { SchemaTemplate, OverlayTemplate, WizardTemplate } from '../lore-react-forms-material-ui';
import { SchemaForm, WizardForm, RequestForm, CustomForm } from '../lore-react-forms-material-ui';
import { FormSection, PropBarrier } from 'lore-react-forms';
import { FlatButton, RaisedButton, Step, StepLabel } from 'material-ui';
// import SchemaForm from '../lore-react-forms-material-ui/forms/SchemaForm';
// import WizardForm from '../lore-react-forms-material-ui/forms/WizardForm';
// import RequestForm from '../lore-react-forms-material-ui/forms/RequestForm';
// import CustomForm from '../lore-react-forms-material-ui/forms/CustomForm';

import CreateDefaultBlueprint from './blueprints/create.default';
import CreateOverlayBlueprint from './blueprints/create.overlay';
import CreateWizardBlueprint from './blueprints/create.wizard';

import UpdateDefaultBlueprint from './blueprints/update.default';
import UpdateOverlayBlueprint from './blueprints/update.overlay';
import UpdateWizardBlueprint from './blueprints/update.wizard';

import DestroyDefaultBlueprint from './blueprints/destroy.default';
import DestroyOverlayBlueprint from './blueprints/destroy.overlay';
import DestroyWizardBlueprint from './blueprints/destroy.wizard';

import {
  TextField,
//   PasswordField,
//   ConnectedSelectField,
  AutoCompleteField,
//   CheckboxField,
//   MarkdownField,
} from '../lore-react-forms-material-ui';

import Connect from '../../src/components/Connect';

import formLoader from './loaders/forms';

export default {

  dependencies: ['models'],

  defaults: {
    forms: {
      defaultTemplate: 'default',
      defaultSchema: 'default',

      templates: {
        default: SchemaTemplate,
        overlay: OverlayTemplate,
        wizard: WizardTemplate
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
          update: UpdateDefaultBlueprint,
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
        custom: (props) => {
          return (
            <CustomForm {...props} />
          );
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
      }
    }
  },

  load: function(lore) {
    const models = lore.loader.loadModels();
    const formSchemas = formLoader.load();
    const {
      defaultTemplate,
      defaultSchema,
      templates,
      blueprints,
      schemas,
      formMap,
      fieldMap,
      actionMap
    } = lore.config.forms;

    lore.forms = {};

    // Step 1: create convention-based forms from models
    // _.mapValues(models, function(modelConfig, modelName) {
    //   lore.forms[modelName] = lore.forms[modelName] || {};
    //   _.assign(lore.forms[modelName], {
    //     create: function(options) {
    //       return blueprints.create[modelName][options.template || 'default'](modelName, modelConfig.attributes || {})
    //     },
    //     destroy: function(options) {
    //       return blueprints.destroy[modelName][options.template || 'default'](modelName, modelConfig.attributes || {})
    //     },
    //     update: function(options) {
    //       return blueprints.update[modelName][options.template || 'default'](modelName, modelConfig.attributes || {})
    //     }
    //   })
    // });
    _.mapValues(models, function(modelConfig, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      const attributes = modelConfig.attributes || {};

      function generateForm(configTemplate) {
        return function form(props={}, options={}) {
          const config = configTemplate[props.template || defaultTemplate](modelName, attributes);
          const template = templates[props.template || defaultTemplate];
          const templateProps = {
            schema: schemas[props.schema || defaultSchema],
            // template: props.template || 'card',
            // model: model,
            reducer: props.reducer || modelName,
            action: props.action || modelName,
            config: config,
            formMap: formMap,
            fieldMap: fieldMap,
            actionMap: actionMap,
            ..._.omit(props, ['template', 'reducer', 'action'])
          };

          return React.createElement(template, templateProps);
        };
      }

      _.assign(lore.forms[modelName], {
        create: generateForm(blueprints.create),
        destroy: generateForm(blueprints.destroy),
        update: generateForm(blueprints.update)
      });
    });

    // Step 2: override with forms defined in /forms
    _.mapKeys(formSchemas, function(folderSchema, folderName) {
      if (_.startsWith(folderName, '_')) {
        return;
      }

      if (!_.isPlainObject(folderSchema)) {
        return;
      }

      lore.forms[folderName] = lore.forms[folderName] || {};

      _.mapKeys(folderSchema, function(schema, fileName) {
        if (_.startsWith(fileName, '_')) {
          return;
        }

        if (!_.isPlainObject(schema)) {
          return;
        }

        lore.forms[folderName][fileName] = function(props={}, options={}) {
          const template = templates[props.template || defaultTemplate];
          const templateProps = {
            schema: schemas[props.schema || defaultSchema],
            // template: props.template || 'card',
            // model: model,
            reducer: props.reducer || folderName,
            action: props.action || folderName,
            config: schema,
            formMap: formMap,
            fieldMap: fieldMap,
            actionMap: actionMap,
            ..._.omit(props, ['template', 'reducer', 'action'])
          };

          return React.createElement(template, templateProps);
        };
      })
    });
  }

};
