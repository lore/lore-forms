import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, CircularProgress, SelectField as MuiSelectField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { PayloadStates } from 'lore-utils';
import { connect } from '../../../../../hooks/lore-hook-connect';

function mapDataToOptions(data, field) {
  return data.map(function(datum) {
    return {
      value: datum.id,
      text: datum.data[field]
    };
  });
}

class SelectField extends Field {

  onChange(event, key, value) {
    const {
      name,
      onChange,
      afterChange
    } = this.props;

    this.onBlur();
    onChange(name, value);
    if (afterChange) {
      afterChange(onChange);
    }
  }

  renderOption(option) {
    const text = option.text;
    const value = option.value;

    return (
      <MenuItem
        key={value}
        value={value}
        primaryText={text}
      />
    );
  }

  render() {
    const {
      name,
      data,
      errors,
      errorText,
      options,
      field,
      ...other
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;

    if (options.state === PayloadStates.FETCHING) {
      return (
        <CircularProgress />
      );
    }

    const optionsData = mapDataToOptions(options.data, field);

    return (
      <MuiSelectField
        {..._.omit(other, ['hasError', 'element', 'callback', 'validators'])}
        value={value}
        onChange={this.onChange}
        errorText={touched && (errors[name] || errorText)}
      >
        {[this.renderOption({ value: null, text: '' })].concat(
          optionsData.map(this.renderOption)
        )}
      </MuiSelectField>
    );
  }

}

SelectField.propTypes = _.assign({}, Field.propTypes, {
  options: PropTypes.object.isRequired
});

SelectField.defaultProps = _.assign({}, Field.defaultProps, {
  options: {
    data: []
  }
});

// export default SelectField;

export default connect(function(getState, props, context) {
  return props.callback(getState, props, context);
})(SelectField);
