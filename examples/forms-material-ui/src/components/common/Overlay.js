import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'Overlay',

  propTypes: {
    model: PropTypes.object
  },

  isSaving: function() {
    var model = this.props.model;
    return (
      model.state === PayloadStates.FETCHING ||
      model.state === PayloadStates.UPDATING ||
      model.state === PayloadStates.CREATING
    );
  },

  render: function() {
    var model = this.props.model;
    var isSaving = model ? this.isSaving() : null;
    // isSaving = true;

    return (
      <div className={"form-overlay" + (isSaving ? " saving" : "")}>
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
