/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import formLoader from './loaders/forms';
import defaultFormConfig from './config';

export { defaultFormConfig as config };

export { default as CreateOptimisticBlueprint } from './blueprints/create/Optimistic';
export { default as CreateOverlayBlueprint } from './blueprints/create/Overlay';
export { default as CreateWizardBlueprint } from './blueprints/create/Wizard';
export { default as UpdateOptimisticBlueprint } from './blueprints/update/Optimistic';
export { default as UpdateOverlayBlueprint } from './blueprints/update/Overlay';
export { default as UpdateWizardBlueprint } from './blueprints/update/Wizard';
export { default as DestroyOptimisticBlueprint } from './blueprints/destroy/Optimistic';
export { default as DestroyOverlayBlueprint } from './blueprints/destroy/Overlay';
export { default as DestroyWizardBlueprint } from './blueprints/destroy/Wizard';

export default {

  dependencies: ['models'],

  defaults: {
    forms: defaultFormConfig
  },

  load: function(lore) {
    const models = lore.loader.loadModels();
    const formSchemas = {};//formLoader.load();
    const {
      defaultBlueprint,
      defaultSchema,
      blueprints,
      schemas,
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

      const formsConfig = modelConfig.forms || {};

      function generateForm(blueprints, method) {
        return function form(props = {}, options = {}) {
          const config = formsConfig[method] || {};
          const blueprint = blueprints[props.blueprint || defaultBlueprint];
          const blueprintProps = {
            schema: schemas[props.schema || defaultSchema],
            fieldMap: fieldMap,
            actionMap: actionMap,
            modelName: modelName,
            config: config,
            ..._.omit(props, ['blueprint', 'reducer', 'action'])
          };

          return React.createElement(blueprint, blueprintProps);
        };
      }

      _.assign(lore.forms[modelName], {
        create: function(props={}, options={}) {
          return generateForm(blueprints.create, 'create')(props, options);
        },
        destroy: function(model, props={}, options={}) {
          props.model = model;
          return generateForm(blueprints.destroy, 'destroy')(props, options);
        },
        update: function(model, props={}, options={}) {
          props.model = model;
          return generateForm(blueprints.update, 'update')(props, options);
        }
      });
    });

    /*
     * Step 2:
     * Override conventions with any forms defined in /forms, ignoring any
     * folders that start with "_"
     */
    _.mapKeys(formSchemas, function(folderSchema, folderName) {
      // ignore any folders that begin with underscore
      if (_.startsWith(folderName, '_')) {
        return;
      }

      // if the result is not an object, this hook has no idea what to do
      // with it, so bail. This hook assumes a double folder structure, such
      // as src/forms/tweet/post.js or src/forms/tweet/post/index.js, and
      // has no idea what to do if the first result is not a folder named after
      // a model
      if (!_.isPlainObject(folderSchema)) {
        return;
      }

      lore.forms[folderName] = lore.forms[folderName] || {};

      _.mapKeys(folderSchema, function(schema, fileName) {
        let Component = null;

        if (_.startsWith(fileName, '_')) {
          return;
        }

        // if the result is a component, use that as the form
        if (_.isFunction(schema)) {
          Component = schema;
        }

        // if the result is an object, then it's a folder, so use the index file
        // as the component if one exists
        if (_.isPlainObject(schema) && _.isFunction(schema.index)) {
          Component = schema.index;
        }

        // if neither condition is true, this hook has no idea what to do, so bail
        if (!Component) {
          return;
        }

        // set the form to the component we found
        lore.forms[folderName][fileName] = Component;

        // if the name of the file is create, wrap it in a function so it mirrors
        // the behavior of the blueprint, so it can be invoked as a function
        if (fileName === 'create') {
          lore.forms[folderName][fileName] = function(props={}, options={}) {
            return React.createElement(Component, props);
          };
        }

        // if the name of the file is update or destroy, wrap it in a function so it
        // mirrors the behavior of the blueprint, so it can be invoked as a function
        // with the model we should update or destroy
        if (
          fileName === 'destroy' ||
          fileName === 'update'
        ) {
          lore.forms[folderName][fileName] = function(model, props={}, options={}) {
            props.model = model;
            return React.createElement(Component, props);
          };
        }
      })
    });
  }

};
