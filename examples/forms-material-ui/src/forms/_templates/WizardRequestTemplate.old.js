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
    request: PropTypes.func.isRequired,
    reducer: PropTypes.string.isRequired,
    // action: PropTypes.string.isRequired,
    singleton: PropTypes.bool,
    onRequestSuccess: PropTypes.func.isRequired,
    onRequestError: PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      isSaving: false,
      request: null,
      showSuccessMessage: true,
      hasError: false
    };
  },

  componentWillMount: function() {
    const {
      request,
      data
    } = this.props;

    this.setState({
      request: request(data)
    });
  },

  onRequestSuccess: function(request) {
    const { onRequestSuccess } = this.props;

    this.setState({
      isSaving: false,
      request: null,
      showSuccessMessage: true,
      hasError: false
    });

    onRequestSuccess(request);
  },

  onRequestError: function(request) {
    const { onRequestError } = this.props;

    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });

    onRequestError(request);
  },

  render: function() {
    const {
      reducer,
      singleton
    } = this.props;

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
