import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormState extends Component {

  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  render() {
    var data = this.props.data;

    return (
      <p className="state">
        {JSON.stringify(data, null, 2)}
      </p>
    )
  }
}

export default FormState;
