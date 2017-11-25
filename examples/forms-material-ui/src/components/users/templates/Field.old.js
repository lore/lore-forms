import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  TextField as MuiTextField,
  DynamicTextField as MuiDynamicTextField,
  SelectField as MuiSelectField
} from 'lore-react-forms-material-ui';
import _ from 'lodash';
import TextField from './fields/TextField';
import DynamicTextField from './fields/DynamicTextField';
import SelectField from './fields/SelectField';
import { Connect } from 'lore-hook-connect';
// import { Connect } from '../../../../hooks/lore-hook-connect';

export default createReactClass({
  displayName: 'Field',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    let {
      // name,
      // data,
      // errors,
      // hasError,
      // onChange,
      type,
      props,
      render,
      ...other
    } = this.props;

    if (_.isFunction(props)) {
      props = props(form);
    }

    if (type === 'string') {
      return (
        <TextField
          {...other}
          {...props}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'text') {
      return (
        <TextField
          {...other}
          {...props}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'dynamicString') {
      return (
        <Connect {...other}>
          <DynamicTextField
            {...other}
            {...props}
            style={{ width: '100%' }}
          />
        </Connect>
      );
    }

    if (type === 'custom') {
      return render(this.props);
    }

    if (type === 'select') {
      return (
        <Connect {...other} {...props}>
          <SelectField
            {...other}
            {...props}
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

    return (
      <div>Unknown field: {type}</div>
    );
  }

});
