import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CardTitle, Stepper, Step, StepLabel, CircularProgress } from 'material-ui';
import SchemaForm from './SchemaForm';
import Request from '../templates/_common/Request';
import { result as _result } from 'lore-utils';

const styles = {
  container: {
    paddingTop: '24px'
  },
  spinner: {
    textAlign: 'center',
    padding: '32px'
  }
};

export default createReactClass({
  displayName: 'RequestForm',

  // propTypes: {
  //   request: PropTypes.object,
  //   reducer: PropTypes.string.isRequired,
  //   singleton: PropTypes.bool.isRequired,
  //   onSuccess: PropTypes.func.isRequired,
  //   onError: PropTypes.func.isRequired,
  // },

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

  getInitialState: function() {
    return {
      request: null,
      isSaving: false,
      hasError: false
    };
  },

  componentWillMount: function() {
    const {
      data
    } = this.props;

    const {
      request
    } = this.getTemplateProps();

    this.setState({
      request: request(data),
      isSaving: true
    });
  },

  onRequestSuccess: function(request) {
    const {
      onSuccess
    } = this.getTemplateProps();

    this.setState({
      isSaving: false,
      request: null,
      hasError: false
    });

    onSuccess(request);
    // this.props.callbacks.onRequestSuccess(request);
  },

  onRequestError: function(request) {
    const {
      onError
    } = this.getTemplateProps();

    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });

    // this.props.callbacks.onRequestError(request);
    onError(request);
  },

  render: function () {
    const {
      request
    } = this.state;

    const {
      title,
      subtitle,
      stepper,
      reducer
    } = this.getTemplateProps();

    // const templateProps = this.getTemplateProps();

    const requestProps = {
      request: request,
      reducer: reducer,
      onSuccess: this.onRequestSuccess,
      onError: this.onRequestError
    };

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
        <Request {...requestProps}>
          <div style={styles.container}>
            <div className="mui-card-text">
              <div className="row">
                <div className="col-md-12">
                  <div style={styles.spinner}>
                    {/*<CircularProgress size={80} thickness={5} />*/}
                    <CircularProgress />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Request>
      </Card>
    );
  }
});
