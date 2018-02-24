import React from 'react';
import { FormSection } from 'lore-react-forms';

export default function(form) {
  return (fields) => {
    return (
      <FormSection className="modal-body">
        {fields}
      </FormSection>
    );
  };
}
