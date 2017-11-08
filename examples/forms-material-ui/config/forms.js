/**
 * Configuration file for forms
 *
 * This file is where you define overrides for the default forms behavior.
 */
import React from 'react';
import _ from 'lodash';
import { FormSection, PropBarrier } from 'lore-react-forms';
import {
  Action as ActionSchema,
  Actions as ActionsSchema,
  Field as FieldSchema,
  Fields as FieldsSchema,
  Form as FormSchema,
  FormStep as FormStepSchema,
  FormSteps as FormStepsSchema,
  Request as RequestSchema,
  Step as StepSchema,
  Stepper as StepperSchema,
  SchemaForm
} from 'lore-react-forms-material-ui';

import {
  TextField,
//   PasswordField,
//   ConnectedSelectField,
  AutoCompleteField,
//   CheckboxField,
//   MarkdownField,
} from 'lore-react-forms-material-ui';

// import { Connect } from '../hooks/lore-hook-connect';
import Connect from '../src/components/Connect';

import Markdown from 'react-markdown';

import { FlatButton } from 'material-ui';

const defaultSchema = {
  Action: ActionSchema,
  Actions: ActionsSchema,
  Field: FieldSchema,
  Fields: FieldsSchema,
  Form: FormSchema,
  FormStep: FormStepSchema,
  FormSteps: FormStepsSchema,
  Request: RequestSchema,
  Step: StepSchema,
  Stepper: StepperSchema
};

export default {

  templates: {
    default: SchemaForm
  },

  schemas: {
    default: {
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

  fieldMap: {
    text: (form, props) => {
      return (
        <TextField
          {...props}
        />
      );
    },
    autocomplete: (form, props) => {
      const {
        getOptions,
        ...other
      } = props;

      return (
        <Connect callback={getOptions}>
          <AutoCompleteField
            {...other}
          />
        </Connect>
      );
    }
  },

  actionMap: {
    submit: (form, props) => {
      return (
        <FlatButton
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
