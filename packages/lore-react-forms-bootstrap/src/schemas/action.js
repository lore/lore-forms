import React from 'react';
import { FormSection } from 'lore-react-forms';

export default function(form) {
  return (action) => {
    return (
      <span style={{ marginLeft: 8 }}>
        {action}
      </span>
    );
  }
}
