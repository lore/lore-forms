import React from 'react';
import { FlatButton } from 'material-ui';

export default function(name, attributes, form, onSubmit) {
  return (
    <FlatButton
      key={name}
      label={attributes.label || 'Submit'}
      primary={true}
      onTouchTap={onSubmit}
    />
  );
}