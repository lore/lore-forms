import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'FormSteps',

  contextTypes: {
    schema: PropTypes.object
  },

  propTypes: {
    stepIndex: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired
  },

  render: function() {
    const {
      Stepper,
      FormStep
    } = this.context.schema;

    const {
      stepIndex,
      steps
    } = this.props;

    const step = steps[stepIndex];

    return (
      <div>
        <Stepper
          stepIndex={stepIndex}
          steps={steps}
        />
        <FormStep
          key={stepIndex}
          {...step}
        />
      </div>
    );
  }

});
