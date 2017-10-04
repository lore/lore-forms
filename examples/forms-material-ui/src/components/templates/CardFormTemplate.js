import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';

// Hook Dialogs
import Overlay from '../common/Overlay';
// import Template from '../../../hooks/lore-hook-forms-material-ui/Template';
import Template from './Template';

export default createReactClass({
  displayName: 'CardFormTemplate',

  propTypes: {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    model: PropTypes.object,
    config: PropTypes.object
  },

  getForm: function(config) {
    return React.createElement(Template, config);
  },

  render: function() {
    var title = this.props.title;
    var subtitle = this.props.subtitle;
    var model = this.props.model;
    var config = this.props.config || _.omit(this.props, ['title', 'subtitle', 'model']);

    return (
      <Overlay model={model}>
        <Card className="form-card">
          <CardTitle
            title="Hook Form"
            subtitle="Created by providing a config to the forms hook" />
          <div>
            {this.getForm(config)}
          </div>
        </Card>
      </Overlay>
    );
  }
});
