import React from 'react';
import { FormSection, PropBarrier } from 'lore-react-forms';

export default function(form) {
  return (actions) => {
    return (
      <FormSection className="modal-footer">
        <PropBarrier>
          {actions}
        </PropBarrier>
      </FormSection>
    );
  };
}
