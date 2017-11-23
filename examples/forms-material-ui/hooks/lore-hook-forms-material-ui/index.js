/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import formLoader from './loaders/forms';
import defaultFormConfig from './config';

export default {

  dependencies: ['models'],

  defaults: {
    forms: defaultFormConfig
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

    /*
     * Step 1:
     * Create convention-based forms from models
     */
    _.mapValues(models, function(modelConfig, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      const attributes = modelConfig.attributes || {};

      function generateForm(configTemplate) {
        return function form(props={}, options={}) {
          const config = configTemplate[props.template || defaultTemplate](modelName, attributes);
          const template = templates[props.template || config.template || defaultTemplate];
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
        create: function(props={}, options={}) {
          return generateForm(blueprints.create)(props, options);
        },
        destroy: function(model, props={}, options={}) {
          props.model = model;
          return generateForm(blueprints.destroy)(props, options);
        },
        update: function(model, props={}, options={}) {
          props.model = model;
          return generateForm(blueprints.update)(props, options);
        }
      });
    });

    /*
     * Step 2:
     * Override conventions with any forms defined in /forms, ignoring any
     * folders that start with "_"
     */
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
