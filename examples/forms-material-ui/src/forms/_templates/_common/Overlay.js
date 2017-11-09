import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';

export default createReactClass({
  displayName: 'Overlay',

  propTypes: {
    isVisible: PropTypes.bool
  },

  render: function() {
    const { isVisible } = this.props;

    return (
      <div className={"form-overlay" + (isVisible ? " visible" : "")}>
        <div className="overlay-label">
          <CircularProgress />
        </div>
        <div className="form-overlay-content">
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }

});
