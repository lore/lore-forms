import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import WizardDynamicSchemaTemplate from './WizardDynamicSchemaTemplate';
import SchemaTemplate from './SchemaTemplate';

export default createReactClass({
  displayName: 'SwitchableWizardDynamicSchemaTemplate',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    callbacks: PropTypes.object,

    schema: PropTypes.object.isRequired,
    formMap: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    const {
      config
    } = this.props;

    return {
      stepIndex: config.stepIndex || 0,
      data: {}
    }
  },

  onSubmit: function(data) {
    console.log('onSubmit');
    this.setState({
      isSaving: true,
      showSuccessMessage: false,
      hasError: false,
      // request: lore.actions.tweet.create({
      //   userId: data.userId,
      //   text: data.text,
      //   createdAt: moment().unix()
      // }).payload
    });
    this.onNext(data);
  },

  onChange: function(name, value) {
    const { onChange } = this.props;

    if (onChange) {
      return onChange(name, value);
    }

    const data = _.extend({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  onNext: function(data) {
    console.log('onNext');
    this.setState({
      data: _.merge({}, this.state.data, data),
      stepIndex: this.state.stepIndex + 1
    });
  },

  onPrevious: function(data) {
    console.log('onPrevious');
    this.setState({
      data: _.merge({}, this.state.data, data),
      stepIndex: this.state.stepIndex - 1
    });
  },

  onRequestSuccess: function() {
    console.log('onRequestSuccess');
    // this.setState({
    //   isSaving: false,
    //   request: null,
    //   showSuccessMessage: true,
    //   hasError: false
    // });
    this.onNext();
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
    this.onPrevious();
  },

  render: function() {
    const {
      // data,
      // validators,
      // onChange,
      schema,
      formMap,
      fieldMap,
      actionMap,
      config,
      callbacks,
      ...other
    } = this.props;

    if (!config.steps) {
      return (
        <SchemaTemplate {...this.props} />
      );
    }

    // Wizard = this component + request concerns
    return (
      <WizardDynamicSchemaTemplate {...this.props} />
    );

    return formMap[config.template.type](
      schema,
      formMap,
      fieldMap,
      actionMap,
      callbacks,
      config,
      other, // props
      // stepIndex || 0
    );
  }

});
