import React from 'react';
import PropTypes from 'prop-types';
import { Stepper } from 'material-ui';
import createReactClass from 'create-react-class';
// import Step from './Step';

export default createReactClass({
  displayName: 'Stepper',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const {
      Step
    } = this.context.template;

    const {
      stepIndex,
      steps
    } = this.props;

    return (
      <Stepper activeStep={stepIndex}>
        {steps.map((step, index) => {
          return (
            <Step
              key={step.name || index}
              step={step}
            />
          );
        })}
      </Stepper>
    );
  }

});
