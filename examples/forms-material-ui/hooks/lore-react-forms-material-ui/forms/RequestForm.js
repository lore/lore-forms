import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';
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
  //   singleton: React.PropTypes.bool.isRequired,
  //   onSuccess: PropTypes.func.isRequired,
  //   onError: PropTypes.func.isRequired,
  // },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return _result(config.props, this.props);
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

    const templateProps = this.getTemplateProps();

    const requestProps = {
      request: request,
      reducer: templateProps.reducer,
      onSuccess: this.onRequestSuccess,
      onError: this.onRequestError
    };

    return (
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
    );
  }
});
