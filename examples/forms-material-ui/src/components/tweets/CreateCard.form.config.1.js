import React from 'react';
import createReactClass from 'create-react-class';
import moment from 'moment';
import _ from 'lodash';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';
import formConfig from '../../forms/tweet/create';

export default createReactClass({
  displayName: 'CreateCard.form.config',

  getInitialState: function() {
    return {
      key: 0,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  onSubmit: function() {
    const {
      key,
      data
    } = this.state;

    lore.actions.tweet.create({
      userId: data.userId,
      text: data.text,
      createdAt: moment().unix()
    });

    const initialData = this.getInitialState().data;

    this.setState({
      key: key + 1,
      data: initialData
    });
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  render: function() {
    const {
      key,
      data
    } = this.state;

    const callbacks = {
      onSubmit: this.onSubmit
    };

    return (
      <SchemaForm
        key={key}
        data={data}
        // validators={validators}
        onChange={this.onChange}
        callbacks={callbacks}
        schema={lore.config.forms.schemas.default}
        formMap={lore.config.forms.formMap}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={formConfig}
      />
    );
  }

});
