/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import dialogLoader from './loaders/dialogs';
import defaultDialogConfig from './config';

export { defaultDialogConfig as config };

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
    dialogs: defaultDialogConfig
  },

  load: function(lore) {
    const models = lore.loader.loadModels();
    const dialogSchemas = dialogLoader.load();
    const {
      defaultBlueprint,
      defaultSchema,
      blueprints,
      schemas,
      fieldMap,
      actionMap
    } = lore.config.dialogs;

    lore.dialogs = {};

    /*
     * Step 0:
     * Create utility for constructing custom dialogs
     */
    lore.dialogs._custom = {};

    function generateGenericForm(blueprints) {
      return function form(props = {}, options = {}) {
        const {
          blueprint: blueprintName = defaultBlueprint,
          schema: schemaName = defaultSchema,
          ...other
        } = props;

        const blueprint = blueprints[blueprintName];
        const blueprintProps = {
          schema: schemas[schemaName],
          fieldMap: fieldMap,
          actionMap: actionMap,
          ...other
        };

        return React.createElement(blueprint, blueprintProps);
      };
    }

    _.assign(lore.dialogs._custom, {
      create: function(props={}, options={}) {
        return generateGenericForm(blueprints.create)(props, options);
      }
    });

    /*
     * Step 1:
     * Create convention-based dialogs from models
     */
    _.mapValues(models, function(modelConfig, modelName) {
      lore.dialogs[modelName] = lore.dialogs[modelName] || {};

      const dialogsConfig = modelConfig.dialogs || {};

      function generateForm(blueprints, method) {
        return function form(props = {}, options = {}) {
          const {
            blueprint: blueprintName = defaultBlueprint,
            schema: schemaName = defaultSchema,
            ...other
          } = props;

          const config = dialogsConfig[method] || {};
          const blueprint = blueprints[blueprintName];
          const blueprintProps = {
            modelName: modelName,
            schema: schemas[schemaName],
            fieldMap: fieldMap,
            actionMap: actionMap,
            ...config,
            ...other
          };

          return React.createElement(blueprint, blueprintProps);
        };
      }

      _.assign(lore.dialogs[modelName], {
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
     * Override conventions with any dialogs defined in /dialogs, ignoring any
     * folders that start with "_"
     */
    _.mapKeys(dialogSchemas, function(folderSchema, folderName) {
      // ignore any folders that begin with underscore
      if (_.startsWith(folderName, '_')) {
        return;
      }

      // if the result is not an object, this hook has no idea what to do
      // with it, so bail. This hook assumes a double folder structure, such
      // as src/dialogs/tweet/post.js or src/dialogs/tweet/post/index.js, and
      // has no idea what to do if the first result is not a folder named after
      // a model
      if (!_.isPlainObject(folderSchema)) {
        return;
      }

      lore.dialogs[folderName] = lore.dialogs[folderName] || {};

      _.mapKeys(folderSchema, function(schema, fileName) {
        let Component = null;

        if (_.startsWith(fileName, '_')) {
          return;
        }

        // if the result is a component, use that as the dialog
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

        // set the dialog to the component we found
        lore.dialogs[folderName][fileName] = function(props = {}) {
          return React.createElement(Component, props);
        };

        // if the name of the file is create, wrap it in a function so it mirrors
        // the behavior of the blueprint, so it can be invoked as a function
        if (fileName === 'create') {
          lore.dialogs[folderName][fileName] = function(props={}, options={}) {
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
          lore.dialogs[folderName][fileName] = function(model, props={}, options={}) {
            props.model = model;
            return React.createElement(Component, props);
          };
        }
      })
    });
  }

};
