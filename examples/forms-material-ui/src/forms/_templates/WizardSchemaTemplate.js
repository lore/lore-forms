import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle, Stepper, Step, StepLabel } from 'material-ui';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';

export default createReactClass({
  displayName: 'WizardSchemaTemplate',

  propTypes: {
    stepIndex: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
  },

  render: function() {
    const {
      stepIndex,
      steps,
      config,
      ...formProps
    } = this.props;

    // const step = steps[stepIndex];

    // const {
    //   template: {
    //     title,
    //     subtitle
    //   }
    // } = step;

    const defaultTemplateProps = {
      title: 'Title',
      subtitle: 'Subtitle',
      stepper: {
        label: 'Label'
      }
    };

    const templateProps = _.defaultsDeep({},
      config.template.props ? config.template.props(this.props) : null,
      defaultTemplateProps
    );

    const stepperProps = templateProps.stepper;

    return (
      <Card className="form-card">
        <CardTitle
          title={templateProps.title}
          subtitle={templateProps.subtitle}
        />
        {stepperProps ? (
          <Stepper activeStep={stepperProps.stepIndex}>
            {stepperProps.steps.map((step, index) => {
              // const stepTemplateProps = _.defaultsDeep({},
              //   step.template.props ? step.template.props() : null,
              //   defaultTemplateProps
              // );
              return (
                <Step key={index}>
                  <StepLabel>
                    {step}
                  </StepLabel>
                </Step>
              );
            }).filter(function(step) {
              return !!step;
            })}
          </Stepper>
        ) : null}
        <SchemaForm
          config={config}
          {...formProps}
        />
      </Card>
    );
  }

});
