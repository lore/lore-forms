import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  displayName: 'Hook',

  propTypes: {
    model: PropTypes.object.isRequired
  },

  render: function() {
    const { model } = this.props;

    return (
      <div key={model.id}>
        {lore.forms.tweet.destroy(model, {
          blueprint: 'overlay'
        })}
      </div>
    );
  }

});
