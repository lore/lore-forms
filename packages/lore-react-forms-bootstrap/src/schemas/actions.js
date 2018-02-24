import React from 'react';
import { FormSection, PropBarrier } from 'lore-react-forms';

export default function(form) {
  return (actions) => {
    return (
      <FormSection style={{ padding: '0 20px 20px 20px', marginTop: '20px', position: 'relative', textAlign: 'right' }}>
        <PropBarrier>
          {actions}
        </PropBarrier>
      </FormSection>
    );
  };
}
