/* eslint prefer-template: "off" */

import React from 'react';
import Field from './common/BootstrapField';

class TextAreaField extends Field {

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    const value = this.props.data[name];
    const touched = this.state.touched;
    const hintText = this.props.hintText;
    const label = this.props.label;
    const rows = this.props.rows || 5;
    const disabled = this.props.disabled;
    // const multiLine = this.props.multiLine || false;
    const displayError = touched && error;

    // const style = _.assign({}, { width: '100%' }, this.props.style);

    return (
      <div className={'form-group' + (displayError ? ' has-error' : '')}>
        <label>{label}</label>
        <textarea
          type="text"
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="form-control"
          placeholder={hintText}
          disabled={disabled}
          rows={rows}
        />
        {displayError ? (
          <span className="help-block">{error}</span>
        ) : null}
      </div>
    );
  }

}

export default TextAreaField;