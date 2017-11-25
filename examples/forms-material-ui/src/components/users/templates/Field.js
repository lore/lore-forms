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
import ConnectedDynamicTextField from './fields/ConnectedDynamicTextField';
import SelectField from './fields/SelectField';
import ConnectedSelectField from './fields/ConnectedSelectField';
import { Connect } from 'lore-hook-connect';
// import { Connect } from '../../../../hooks/lore-hook-connect';

export default createReactClass({
  displayName: 'Field',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const common = _.pick(this.props, [
      'name',
      'data',
      'errors',
      'hasError',
      'onChange',
      'form'
    ]);

    let {
      // name,
      // data,
      // errors,
      // hasError,
      // onChange,

      type,
      props,
      form,
      render,
      // ...other
    } = this.props;

    if (_.isFunction(props)) {
      props = props(form);
    }

    if (type === 'string') {
      return (
        <TextField
          {...common}
          {...props}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'text') {
      return (
        <TextField
          {...common}
          {...props}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'dynamicString') {
      return (
        <Connect {...common} {...props}>
          <DynamicTextField
            style={{ width: '100%' }}
          />
        </Connect>
      );
    }

    if (type === 'custom') {
      return render(this.props);
    }

    // if (type === 'select') {
    //   return (
    //     <Connect {...common} {...props}>
    //       <SelectField
    //         style={{ width: '100%' }}
    //       />
    //     </Connect>
    //   );
    // }

    if (type === 'select') {
      return (
        <ConnectedSelectField
          {...common}
          {...props}
          style={{ width: '100%' }}
        />
      )
    }

    if (type === 'autocomplete') {
      return (
        <Connect {...common} {...props}>
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
