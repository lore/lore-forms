import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';

export default createReactClass({
  displayName: 'Field',

  contextTypes: {
    template: PropTypes.object,
    fields: PropTypes.object
  },

  render: function() {
    const {
      fields
    } = this.context;

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

    const field = fields[type];

    if (type === 'custom') {
      return render(this.props);
    }

    if (field) {
      return field(common, props);
    }

    return (
      <div>Unknown field type: {type}</div>
    );
  }

});
