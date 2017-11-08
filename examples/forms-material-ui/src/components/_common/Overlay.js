import React from 'react';
import { CircularProgress } from 'material-ui';

export default React.createClass({
  displayName: 'Overlay',

  propTypes: {
    isVisible: React.PropTypes.bool
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
