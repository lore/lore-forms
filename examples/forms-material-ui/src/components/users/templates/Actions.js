import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { PropBarrier } from 'lore-react-forms';
// import Action from './Action';

export default createReactClass({
  displayName: 'Actions',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const {
      Action
    } = this.context.template;
    
    const {
      actions,
      form,
      ...other
    } = this.props;

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
