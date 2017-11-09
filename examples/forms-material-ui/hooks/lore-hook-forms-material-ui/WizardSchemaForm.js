import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';

export default createReactClass({
  displayName: 'WizardSchemaForm',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    const { stepIndex } = this.props;

    return {
      stepIndex: stepIndex || 0,
      data: {}
    }
  },

  onNext: function(data) {
    const { onNext } = this.props;

    if (onNext) {
      return onNext(data);
    }

    const nextData = _.merge({}, this.state.data, data);
    this.setState({
      data: nextData,
      stepIndex: this.state.stepIndex + 1
    });
  },

  onPrevious: function(data) {
    const { onPrevious } = this.props;

    if (onPrevious) {
      return onPrevious(data);
    }

    const nextData = _.merge({}, this.state.data, data);
    this.setState({
      data: nextData,
      stepIndex: this.state.stepIndex - 1
    });
  },

  render: function() {
    const {
      // data,
      // validators,
      // onChange,
      callbacks,
      schema,
      formMap,
      fieldMap,
      actionMap,
      config
    } = this.props;

    let step = null;
    let stepIndex = this.state.stepIndex;
    const isWizard = !!config.steps;

    if (isWizard) {
      const {
        // stepIndex,
        steps
      } = config;

      stepIndex = config.stepIndex || stepIndex;

      step = steps[stepIndex];
    } else {
      step = config;
    }

    const modifiedCallbacks = _.defaults({}, callbacks, {
      onNext: this.onNext,
      onPrevious: this.onPrevious
    });

    return formMap[step.template.type](
      schema,
      fieldMap,
      actionMap,
      modifiedCallbacks,
      config,
      { /* props */},
      stepIndex
    );
  }

});
