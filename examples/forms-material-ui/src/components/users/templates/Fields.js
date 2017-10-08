import React from 'react';
import createReactClass from 'create-react-class';
import { TextField, DynamicTextField, SelectField } from 'lore-react-forms-material-ui';
import Connect from '../../Connect';

export default createReactClass({
  displayName: 'Action',

  render: function() {
    const {
      type,
      ...other
    } = this.props;

    if (type === 'string') {
      return (
        <TextField
          {...other}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'text') {
      return (
        <TextField
          {...other}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'dynamicString') {
      return (
        <Connect {...other}>
          <DynamicTextField
            style={{ width: '100%' }}
          />
        </Connect>
      );
    }

    if (type === 'select') {
      return (
        <Connect {...other}>
          <SelectField
            style={{ width: '100%' }}
          />
        </Connect>
      );
    }

    if (type === 'autocomplete') {
      return (
        <Connect {...other}>
          <AutoCompleteField
            style={{ width: '100%' }}
          />
        </Connect>
      );
    }
  }

});
