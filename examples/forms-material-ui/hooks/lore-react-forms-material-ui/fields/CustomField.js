import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class CustomField extends Field {

  render() {
    const {
      name,
      data,
      errors,
      props
    } = this.props;

    // const value = data[name];
    // const touched = this.state.touched;

    return props.render(this.props);
  }

}

export default CustomField;
