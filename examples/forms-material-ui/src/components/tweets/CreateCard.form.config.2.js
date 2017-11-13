import React from 'react';
import createReactClass from 'create-react-class';
import moment from 'moment';
import _ from 'lodash';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';
import FormTemplate from '../../forms/_templates/FormTemplate';
import formConfig from '../../forms/tweet/create';

export default createReactClass({
  displayName: 'CreateCard.form.config.2',

  getInitialState: function() {
    return {
      data: {
        userId: null,
        text: ''
      }
    }
  },

  // onSubmit: function(data) {
  //   lore.actions.tweet.create({
  //     userId: data.userId,
  //     text: data.text,
  //     createdAt: moment().unix()
  //   });
  // },
  //
  // onChange: function(name, value) {
  //   const data = _.merge({}, this.state.data);
  //   data[name] = value;
  //   this.setState({
  //     data: data
  //   });
  // },

  render: function() {
    const {
      data
    } = this.state;

    return (
      <FormTemplate
        data={data}
        // validators={validators}
        // onChange={this.onChange}
        // callbacks={callbacks}
        schema={lore.config.forms.schemas.default}
        formMap={lore.config.forms.formMap}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={formConfig}
      />
    );
  }

});
