import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { PropBarrier } from 'lore-react-forms';

export default createReactClass({
  displayName: 'Actions',

  contextTypes: {
    schema: PropTypes.object
  },

  render: function() {
    const {
      Action
    } = this.context.schema;

    const {
      actions,
      form,
      ...other
    } = this.props;

    if (!actions || actions.length === 0) {
      return <div/>;
    }

    return (
      <PropBarrier className="mui-card-actions">
        {actions.map((action, index) => {
          return (
            <Action
              key={action.name || index}
              form={form}
              {...action}
            />
          );
        })}
      </PropBarrier>
    );
  }

});
