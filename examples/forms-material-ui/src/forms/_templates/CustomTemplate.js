import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CustomTemplate',

  propTypes: {
    config: PropTypes.shape({
      template: PropTypes.shape({
        type: PropTypes.string.isRequired,
        props: PropTypes.func.isRequired,
        // props: PropTypes.oneOfType([
        //   PropTypes.func.isRequired,
        //   PropTypes.shape({
        //     render: PropTypes.func.isRequired
        //   })
        // ])
      }).isRequired
    }).isRequired
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return config.template.props(this.props);
  },

  render: function() {
    const {
      render
    } = this.getTemplateProps();

    return render(this.props);
  }

});
