import React from 'react';
import { FormSection } from 'lore-react-forms';

export default function(form) {
  return (fields) => {
    return (
      <FormSection style={{ padding: 16, position: 'relative' }}>
        {fields}
      </FormSection>
    );
  };
}
