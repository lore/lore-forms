import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'FormSteps',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const {
      Stepper,
      FormStep
    } = this.context.template;

    const {
      config: {
        stepIndex,
        steps
      }
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
