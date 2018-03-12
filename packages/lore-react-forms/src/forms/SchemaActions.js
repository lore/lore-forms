import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { result as _result } from 'lore-utils';
import FormSection from '../components/FormSection';

export default createReactClass({
  displayName: 'SchemaActions',

  propTypes: {
    schema: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      actions: []
    }
  },

  render: function () {
    const {
      schema,
      actionMap,
      form,
      actions
    } = this.props;

    return (
      <FormSection>
        {schema.actions(form)(
          actions.map((action, index) => {
            const mappedAction = actionMap[action.type];
            if (!mappedAction) {
              throw new Error(`There is no actionMap entry for "${action.type}". Valid options are ${Object.keys(actionMap).join(', ')}.`);
            }
            const actionProps = _result(action.props, form);
            return (
              React.cloneElement(schema.action(form)(
                mappedAction(form, actionProps),
                actionProps
              ), {
                key: index
              })
            );
          })
        )}
      </FormSection>
    );
  }

});
