import React from 'react';
import PropTypes from 'prop-types';
import { Step, StepLabel } from 'material-ui';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'Step',

  contextTypes: {
    schema: PropTypes.object
  },

  render: function() {
    const {
      step
    } = this.props;

    return (
      <Step {...this.props}>
        <StepLabel>
          {step.name}
        </StepLabel>
      </Step>
    );
  }

});
