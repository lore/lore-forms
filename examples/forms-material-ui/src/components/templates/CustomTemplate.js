import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import logo from '../../../assets/images/logo.png';

// react-form
import { Form, FormSection, PropBarrier } from 'lore-react-forms';

import Template from './Template';
import Overlay from '../common/Overlay';

const Header = createReactClass({
  displayName: 'Header',

  propTypes: {
    label: PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className="header">
        <img src={logo} />
        <h3>
          {this.props.label}
        </h3>
      </div>
    );
  }
});

const Footer = createReactClass({
  displayName: 'Footer',

  propTypes: {
    children: PropTypes.node.isRequired
  },

  render: function () {
    return (
      <div className="footer">
        {this.props.children}
      </div>
    );
  }
});

export default createReactClass({
  displayName: 'CustomTemplate',

  propTypes: {
    title: PropTypes.string.isRequired,
    footer: PropTypes.node.isRequired,
    model: PropTypes.object,
    config: PropTypes.object
  },

  getForm: function(config) {
    return React.createElement(Template, config);
  },

  render: function() {
    var title = this.props.title;
    var footer = this.props.footer;
    var model = this.props.model;
    var config = this.props.config || _.omit(this.props, ['title', 'subtitle', 'model']);

    return (
      <Overlay model={model}>
        <Card className="form-card custom-form-card">
          <Header label={title} />
          {this.getForm(config)}
          <Footer>
            {footer}
          </Footer>
        </Card>
      </Overlay>
    );
  }
});
