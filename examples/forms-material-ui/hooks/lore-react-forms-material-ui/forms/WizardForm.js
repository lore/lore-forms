import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle, Stepper, Step, StepLabel } from 'material-ui';
import SchemaForm from './SchemaForm';
import RequestError from '../templates/_common/RequestError';
import _result from '../_result';

export default createReactClass({
  displayName: 'WizardForm',

  propTypes: {
    // stepIndex: PropTypes.number.isRequired,
    // steps: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    const defaultTemplateProps = {
      title: 'Title',
      subtitle: 'Subtitle',
      stepper: {
        label: 'Label'
      }
    };

    return _.defaultsDeep({},
      _result(config.props, this.props),
      defaultTemplateProps
    );
  },

  render: function() {
    const {
      config,
      request,
      ...formProps
    } = this.props;

    const {
      title,
      subtitle,
      stepper
    } = this.getTemplateProps();

    return (
      <Card className="form-card">
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <RequestError request={request} />
        {stepper ? (
          <Stepper activeStep={stepper.stepIndex}>
            {stepper.steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>
                    {step}
                  </StepLabel>
                </Step>
              );
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
