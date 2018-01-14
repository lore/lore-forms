import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-hook-forms-material-ui';

export default createReactClass({
  displayName: 'Update.Optimistic',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    modelName: PropTypes.string.isRequired
  },

  getInitialState: function() {
    const { model, data } = this.props;

    return {
      data: _.merge({}, model.data, data)
    };
  },

  onSubmit: function(data) {
    const { modelName, model } = this.props;
    lore.actions[modelName].update(model, data);
    this.props.onCancel();
  },

  onChange: function(name, value) {
    const nextData = _.merge({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  getValidators: function(data) {
    const { validators } = this.props;
    return _result(validators || {}, data);
  },

  render: function() {
    const { modelName } = this.props;
    const {
      schema,
      fieldMap,
      actionMap,
      config
    } = this.props;
    const { data } = this.state;
    const validators = this.getValidators(data);

    return (
      <div>
        <CardTitle title={`Update ${_.capitalize(modelName)}`} />
        <SchemaForm
          data={data}
          validators={validators}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          callbacks={{
            onSubmit: this.onSubmit,
            onCancel: this.props.onCancel
          }}
          schema={schema}
          fieldMap={fieldMap}
          actionMap={actionMap}
          config={_.merge({
            fields: {},
            actions: []
          }, config)}
        />
      </div>
    );
  }

});
