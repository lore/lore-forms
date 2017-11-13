import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Card, CircularProgress } from 'material-ui';
import Request from './_common/Request';

export default createReactClass({
  displayName: 'WizardRequestTemplate',

  propTypes: {
    data: PropTypes.object.isRequired,
    callbacks: PropTypes.shape({
      onRequestSuccess: PropTypes.func.isRequired,
      onRequestError: PropTypes.func.isRequired
    }).isRequired,
    // config: PropTypes.shape({
    //   props: PropTypes.func.isRequired
    // }).isRequired
    // config: PropTypes.oneOfType([
    //   PropTypes.func,
    //   PropTypes.shape({
    //     data: PropTypes.object.isRequired,
    //     request: PropTypes.func.isRequired,
    //     reducer: PropTypes.string.isRequired,
    //     // action: PropTypes.string.isRequired,
    //     singleton: PropTypes.bool,
    //   }),
    // ])
  },

  getInitialState: function() {
    return {
      isSaving: false,
      request: null,
      showSuccessMessage: true,
      hasError: false
    };
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return config.template.props(this.props);
  },

  componentWillMount: function() {
    const {
      data
    } = this.props;

    const {
      request
    } = this.getTemplateProps();

    this.setState({
      request: request(data)
    });
  },

  onRequestSuccess: function(request) {
    const { onRequestSuccess } = this.props.callbacks;

    this.setState({
      isSaving: false,
      request: null,
      showSuccessMessage: true,
      hasError: false
    });

    onRequestSuccess(request);
  },

  onRequestError: function(request) {
    const { onRequestError } = this.props.callbacks;

    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });

    onRequestError(request);
  },

  render: function() {
    const {
      data
    } = this.props;

    const {
      reducer
    } = this.getTemplateProps();

    const {
      request
    } = this.state;

    return (
      <Card className="form-card">
        <Request
          request={request}
          reducer={reducer}
          onSuccess={this.onRequestSuccess}
          onError={this.onRequestError}
        >
          <div>
            <div className="mui-card-text">
              <div className="row">
                <div className="col-md-12">
                  <div className="request-status">
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
