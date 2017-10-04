import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class DynamicTextField extends Field {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange = _.debounce(this.handleChange, 250);
    this.state = {
      value: this.props.data[this.props.name]
    };
  }

  handleChange() {
    this.props.onChange(
      this.props.name,
      this.state.value
    );
  }

  onChange(event, value) {
    this.setState({
      value: value
    });
    this.handleChange();
  }

  render() {
    const {
      name,
      data,
      errors,
      errorText,
      _model,
      getMessage,
      ...other
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;
    const options = getMessage ? getMessage(_model) : {};

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          {...other}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          errorText={touched && (errors[name] || errorText) || options.message}
          disabled={disabled}
        />
        {options.icon}
      </div>
    );
  }

}

export default DynamicTextField;
