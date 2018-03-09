import React from 'react';
import Step from './forms/Step';
import Confirmation from './forms/Confirmation';

export default {
  step: {
    render: (props, config) => {
      return (
        <Step
          {...props}
          {...config}
        />
      );
    }
  },
  confirmation: {
    render: (props, config) => {
      return (
        <Confirmation
          {...props}
          {...config}
        />
      );
    }
  },
  custom: {
    render: (props, config) => {
      return props.render(props, config);
    }
  }
};
