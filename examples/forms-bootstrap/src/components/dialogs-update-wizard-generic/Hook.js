import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import config from './config';

export default createReactClass({
  displayName: 'Hook',

  propTypes: {
    model: PropTypes.object.isRequired
  },

  render: function() {
    const { model } = this.props;

    return (
      <div style={{ padding: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            lore.dialog.show(() => (
              lore.dialogs.tweet.update(model, config)
            ))
          }}
        >
          Open Dialog
        </button>
      </div>
    );
  }

});
