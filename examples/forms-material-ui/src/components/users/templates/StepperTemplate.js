import React from 'react';
import { Stepper, Step, StepLabel } from 'material-ui';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'StepperTemplate',

  render: function() {
    const {
      stepIndex,
      config
    } = this.props;

    const steps = config.steps.filter((step) => {
      return !!step.name;
    });

    return (
      <Stepper activeStep={stepIndex}>
        {steps.map((step) => {
          return (
            <Step key={step.name}>
              <StepLabel>
                {step.name}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }

});
