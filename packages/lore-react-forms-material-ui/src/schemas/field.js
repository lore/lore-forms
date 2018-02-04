import React from 'react';
import { FormSection } from 'lore-react-forms';

export default function(form) {
  return (field) => {
    return (
      <FormSection>
        {field}
      </FormSection>
    );
  }
}
