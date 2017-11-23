import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field, PropBarrier } from 'lore-react-forms';

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
      props
    } = this.props;

    const value = this.state.value;
    const touched = this.state.touched;
    const options = getMessage ? getMessage(_model) : {};

    const messageStyle = {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: 'rgba(0, 0, 0, 0.54)',
      // transition: transitions.easeOut(),
    };

    const hasError = touched && (errors[name] || errorText);

    return (
      <PropBarrier style={{ position: 'relative' }}>
        <TextField
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          errorText={touched && (errors[name] || errorText)}
          // errorStyle={{ color: 'rgba(0, 0, 0, 0.54)' }}
          // underlineStyle={{ display: 'none' }}
          {...props}
        />
        {options.icon}
        {options.message && !hasError ? (
          <div style={messageStyle}>
            {options.message}
          </div>
        ) : null }
      </PropBarrier>
    );
  }

  // render() {
  //   const {
  //     name,
  //     data,
  //     errors,
  //     props
  //   } = this.props;
  //
  //   const value = data[name];
  //   const touched = this.state.touched;
  //
  //   return (
  //     <MuiTextField
  //       name={name}
  //       value={value}
  //       onChange={this.onChange}
  //       onFocus={this.onFocus}
  //       onBlur={this.onBlur}
  //       errorText={touched && errors[name]}
  //       {...props}
  //     />
  //   );
  // }

}

export default DynamicTextField;
