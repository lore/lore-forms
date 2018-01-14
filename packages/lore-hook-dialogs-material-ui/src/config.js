/* eslint no-param-reassign: "off" */

import React from 'react';
import CreateOptimisticBlueprint from './blueprints/create/Optimistic';
import CreateOverlayBlueprint from './blueprints/create/Overlay';
import CreateWizardBlueprint from './blueprints/create/Wizard';
import UpdateOptimisticBlueprint from './blueprints/update/Optimistic';
import UpdateOverlayBlueprint from './blueprints/update/Overlay';
import UpdateWizardBlueprint from './blueprints/update/Wizard';
import DestroyOptimisticBlueprint from './blueprints/destroy/Optimistic';
import DestroyOverlayBlueprint from './blueprints/destroy/Overlay';
import DestroyWizardBlueprint from './blueprints/destroy/Wizard';

import actionSchema from './schemas/action';
import actionsSchema from './schemas/actions';
import fieldSchema from './schemas/field';
import fieldsSchema from './schemas/fields';

import {
  textField,
  passwordField,
  selectField,
  checkboxField,
  customField,
  stringField,
  flatAction,
  raisedAction
} from 'lore-hook-forms-material-ui';

export default {
  defaultBlueprint: 'optimistic',
  defaultSchema: 'default',

  blueprints: {
    create: {
      optimistic: CreateOptimisticBlueprint,
      overlay: CreateOverlayBlueprint,
      wizard: CreateWizardBlueprint
    },
    destroy: {
      optimistic: DestroyOptimisticBlueprint,
      overlay: DestroyOverlayBlueprint,
      wizard: DestroyWizardBlueprint
    },
    update: {
      optimistic: UpdateOptimisticBlueprint,
      overlay: UpdateOverlayBlueprint,
      wizard: UpdateWizardBlueprint
    }
  },

  schemas: {
    default: {
      action: actionSchema,
      actions: actionsSchema,
      field: fieldSchema,
      fields: fieldsSchema,
    }
  },

  fieldMap: {
    custom: customField,
    text: textField,
    password: passwordField,
    checkbox: checkboxField,
    select: selectField,
    string: stringField
  },

  actionMap: {
    flat: flatAction,
    raised: raisedAction
  }
}
