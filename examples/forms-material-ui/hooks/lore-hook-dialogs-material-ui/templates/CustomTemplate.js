import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { result as _result } from 'lore-utils';
import Dialog from '../../../src/decorators/Dialog';

export default Dialog()(createReactClass({
  displayName: 'CustomTemplate',

  propTypes: {
    config: PropTypes.shape({
      template: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
      // props: PropTypes.oneOfType([
      //   PropTypes.func.isRequired,
      //   PropTypes.shape({
      //     render: PropTypes.func.isRequired
      //   })
      // ])
    }).isRequired
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return _result(config.props, this.props);
  },

  render: function() {
    const {
      config: {
        render
      }
    } = this.props;

    // const {
    //   render
    // } = this.getTemplateProps();

    return render(this.props);
  }

}));
