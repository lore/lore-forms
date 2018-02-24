import React from 'react';
import { FormSection } from 'lore-react-forms';

export default function(form) {
  return (fields) => {
    return (
      <FormSection style={{ padding: '20px 20px 0px 20px', marginBottom: '20px', position: 'relative' }}>
        {fields}
      </FormSection>
    );
  };
}
