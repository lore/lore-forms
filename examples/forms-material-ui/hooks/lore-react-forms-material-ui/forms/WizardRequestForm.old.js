import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle, Stepper, Step, StepLabel } from 'material-ui';
// import RequestError from '../templates/_common/RequestError';
import { result as _result } from 'lore-utils';
import RequestForm from './RequestForm';

export default createReactClass({
  displayName: 'WizardRequestForm',

  propTypes: {
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
      stepper,
      ...requestProps
    } = this.getTemplateProps();

    return (
      <Card className="form-card">
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        {/*<RequestError request={request} />*/}
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
        <RequestForm
          config={config}
          {...requestProps}
        />
      </Card>
    );
  }

});
