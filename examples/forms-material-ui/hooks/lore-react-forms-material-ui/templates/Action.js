import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, RaisedButton } from 'material-ui';
import createReactClass from 'create-react-class';
import _ from 'lodash';

export default createReactClass({
  displayName: 'Action',

  contextTypes: {
    schema: PropTypes.object
  },

  render: function() {
    let {
      type,
      props,
      form,
      ...other
    } = this.props;

    if (_.isFunction(props)) {
      props = props(form);
    }

    if (type === 'flat') {
      return (
        <FlatButton
          {...props}
        />
      );
    }

    if (type === 'raised') {
      return (
        <RaisedButton
          {...props}
          primary={true}
        />
      );
    }

    return (
      <div>Unknown action: {type}</div>
    );
  }

});
