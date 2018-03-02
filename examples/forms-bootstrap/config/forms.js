/**
 * Configuration file for forms
 *
 * This file is where you define overrides for the default forms behavior.
 */
import React from 'react';
import { FormSection, PropBarrier } from 'lore-react-forms';

export default {

  schemas: {
    default: {
      action: function(form) {
        return (action) => {
          return action;
        }
      },
      actions: function(form) {
        return (actions) => {
          return (
            <FormSection className="modal-footer">
              <PropBarrier>
                {actions}
              </PropBarrier>
            </FormSection>
          );
        };
      },
      field: function(form) {
        return (field) => {
          return (
            <FormSection>
              {field}
            </FormSection>
          );
        }
      },
      fields: function(form) {
        return (fields) => {
          return (
            <FormSection className="modal-body">
              {fields}
            </FormSection>
          );
        };
      },
    }
  }

};
