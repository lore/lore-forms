import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle, Stepper, Step, StepLabel } from 'material-ui';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/SchemaForm';

export default createReactClass({
  displayName: 'WizardSchemaRequestTemplate',

  propTypes: {
    stepIndex: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired
  },

  render: function() {
    const {
      stepIndex,
      config: {
        // stepIndex,
        steps
      },
      ...formProps
    } = this.props;

    const step = steps[stepIndex];

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
      step.template.props(),
      defaultTemplateProps
    );

    return (
      <Card className="form-card">
        <CardTitle
          title={templateProps.title}
          subtitle={templateProps.subtitle}
        />
        <Stepper activeStep={stepIndex}>
          {steps.map((step, index) => {
            const stepTemplateProps = _.defaultsDeep({},
              step.template.props ? step.template.props() : null,
              defaultTemplateProps
            );
            return (
              <Step key={index}>
                <StepLabel>
                  {stepTemplateProps.stepper.label}
                </StepLabel>
              </Step>
            );
          }).filter(function(step) {
            return !!step;
          })}
        </Stepper>
        <SchemaForm
          config={step}
          {...formProps}
        />
      </Card>
    );
  }

});
