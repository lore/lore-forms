/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import SchemaForm from './SchemaForm';
import WizardSchemaForm from './WizardSchemaForm';
import formLoader from './loaders/forms';

export default {

  dependencies: ['models'],

  defaults: {
    forms: {
      templates: {
        default: WizardSchemaForm
      },

      schemas: {
        // default: DefaultSchema
      },

      formMap: {

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
    const { templates, schemas, formMap, fieldMap, actionMap } = lore.config.forms;

    lore.forms = {};

    // Step 1: create convention-based forms from models
    // _.mapKeys(schemas, function(schema, modelName) {
    //   lore.forms[modelName] = lore.forms[modelName] || {};
    // });

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
          const templateProps = {
            schema: schemas[props.schema || 'default'],
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

          return React.createElement(templates[props.template], templateProps);
        };
      })
    });
  }

};
