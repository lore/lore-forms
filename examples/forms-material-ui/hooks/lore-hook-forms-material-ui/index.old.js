/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import {
  Action as ActionTemplate,
  Actions as ActionsTemplate,
  Field as FieldTemplate,
  Fields as FieldsTemplate,
  Form as FormTemplate,
  FormStep as FormStepTemplate,
  FormSteps as FormStepsTemplate,
  Request as RequestTemplate,
  Step as StepTemplate,
  Stepper as StepperTemplate,
  SchemaForm
} from 'lore-react-forms-material-ui';

const DefaultSchema = {
  Action: ActionTemplate,
  Actions: ActionsTemplate,
  Field: FieldTemplate,
  Fields: FieldsTemplate,
  Form: FormTemplate,
  FormStep: FormStepTemplate,
  FormSteps: FormStepsTemplate,
  Request: RequestTemplate,
  Step: StepTemplate,
  Stepper: StepperTemplate,
};

// import CreateCardTemplate from '../../src/forms/_templates/CreateCard/CreateCard';

import formLoader from './loaders/forms';

export default {

  dependencies: ['models'],

  defaults: {
    forms: {
      templates: {
        default: SchemaForm,
      },

      schemas: {
        // default: DefaultSchema
      },

      fieldMap: {
        // string: StringField,
        // dynamicString: DynamicStringField,
        // text: TextField,
        // checkbox: CheckboxField,
        // number: NumberField,
        // select: SelectField,
        // autocomplete: AutoCompleteField
      },

      actionMap: {
        // cancel: CancelButton,
        // submit: SubmitButton
      }
    }
  },

  load: function(lore) {
    // const schemas = lore.loader.loadModels();
    const formSchemas = formLoader.load();
    const { templates, schemas } = lore.config.forms;

    lore.forms = {};

    // Step 1: create convention-based forms from models
    // _.mapKeys(schemas, function(schema, modelName) {
    //   lore.forms[modelName] = lore.forms[modelName] || {};
    // });

    // Step 2: override with forms defined in /forms
    _.mapKeys(formSchemas, function(schema, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      // lore.forms.contact.create({template: 'card'})

      if (!schema._create) {
        return;
      }

      lore.forms[modelName].create = function(props={}, options={}) {
        const Config = schema._create;

        options = _.defaultsDeep({}, options, {
          fields: []
        });

        // const Template = lore.config.forms.templates[props.template || 'default'];
        // const templateProps = _.merge({}, schema.forms, props);

        // return React.createElement(Template, templateProps);

        const templateProps = {
          schema: schemas[props.template || 'default'],
        // template: props.template || 'card',
          reducer: props.reducer || modelName,
          action: props.action || modelName,
          config: Config,
          ..._.omit(props, ['template', 'reducer', 'action'])
        };

        if (props.template === 'accountCard') {
          return React.createElement(templates[props.template], templateProps);
        }

        console.log('No longer used!');

        // return (
        //   <CreateCardTemplate
        //     template={props.template || 'card'}
        //     {...templateProps}
        //   />
        // );

        // return (
        //   <CreateCardTemplate
        //     template={props.template || 'card'}
        //     reducer={modelName || props.reducer}
        //     action={modelName || props.action}
        //     config={Config}
        //     {..._.omit(props, ['template', 'reducer', 'action'])}
        //   />
        // );
      };

      lore.forms[modelName].update = function(model, props={}, options={}) {
        const Config = schema._update;

        const templateProps = {
          schema: schemas[props.template || 'default'],
          // template: props.template || 'card',
          model: model,
          reducer: props.reducer || modelName,
          action: props.action || modelName,
          config: Config,
          ..._.omit(props, ['template', 'reducer', 'action'])
        };

        if (props.template === 'accountCard') {
          return React.createElement(templates[props.template], templateProps);
        }
      };
    });

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
          const templateProps = {
            schema: schemas[props.template || 'default'],
            // template: props.template || 'card',
            // model: model,
            reducer: props.reducer || folderName,
            action: props.action || folderName,
            config: schema,
            ..._.omit(props, ['template', 'reducer', 'action'])
          };

          if (
            props.template === 'default' ||
            props.template === 'accountCard' ||
            props.template === 'dialogCreateCard' ||
            props.template === 'dialogDestroyCard' ||
            props.template === 'dialogUpdateCard'
          ) {
            return React.createElement(templates[props.template], templateProps);
          }
        };
      })
    });
  }

};
