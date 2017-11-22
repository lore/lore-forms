import React from 'react';
import { MenuItem, CircularProgress, SelectField as MuiSelectField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { PayloadStates } from 'lore-utils';

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
      // field,
      props: {
        field,
        ...props
      }
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
        {...props}
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
  options: React.PropTypes.object.isRequired
});

SelectField.defaultProps = _.assign({}, Field.defaultProps, {
  options: {
    data: []
  }
});

export default SelectField;
