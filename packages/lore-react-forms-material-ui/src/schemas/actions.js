import React from 'react';
import { FormSection, PropBarrier } from 'lore-react-forms';

export default function(form) {
  return (actions) => {
    return (
      <FormSection style={{ padding: 8, position: 'relative', textAlign: 'right' }}>
        <PropBarrier>
          {actions}
        </PropBarrier>
      </FormSection>
    );
  };
}
