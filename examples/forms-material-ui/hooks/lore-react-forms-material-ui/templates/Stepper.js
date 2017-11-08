import React from 'react';
import PropTypes from 'prop-types';
import { Stepper } from 'material-ui';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'Stepper',

  contextTypes: {
    schema: PropTypes.object
  },

  render: function() {
    const {
      Step
    } = this.context.schema;

    const {
      stepIndex,
      steps
    } = this.props;

    // 0: account
    // 1. account request
    // 2. demographics
    // 3. demographics request
    // 4. confirmation

    const step = steps[stepIndex];

    if (!step.stepper) {
      return null;
    }

    let displayedStepIndex = stepIndex;
    let displayedStep = steps[displayedStepIndex];

    while (displayedStep.stepper.include !== false && displayedStep > 0) {
      displayedStepIndex--;
    }

    let lastActiveStepIndex = 0;
    const stepIndexMap = {};

    steps.map(function(step, index) {
      if (step.stepper.include === false) {
        stepIndexMap[index] = lastActiveStepIndex;
      } else {
        stepIndexMap[index] = lastActiveStepIndex;
        lastActiveStepIndex++;
      }
    });

    // const stepIndexMap_real = {
    //   0: 0,
    //   1: 0,
    //   2: 1,
    //   3: 1,
    //   4: 2
    // };

    return (
      <Stepper activeStep={stepIndexMap[stepIndex]}>
        {steps.map((step, index) => {
          if (step.stepper.include === false) {
            // return (
            //   <Step
            //     key={step.name || index}
            //     step={step}
            //     style={{display: 'none'}}
            //   />
            // );

            return null;
          }

          return (
            <Step
              key={index}
              step={step}
            />
          );
        }).filter(function(step) {
          return !!step;
        })}
      </Stepper>
    );
  }

});
