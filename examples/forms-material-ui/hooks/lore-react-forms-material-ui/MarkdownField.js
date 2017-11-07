import React from 'react';
import { TextField as MuiTextField, Tabs, Tab, CardText } from 'material-ui';
import _ from 'lodash';
import { Field, PropBarrier } from 'lore-react-forms';

class MarkdownField extends Field {

  render() {
    const {
      name,
      data,
      errors,
      errorText,
      ...other
    } = this.props;

    const value = data[name];
    const touched = this.state.touched;

    return (
      <PropBarrier>
        <Tabs
          value={this.state.tab}
          onChange={this.onChangeTab}>
          <Tab label="Write" value="a">
            <CardText>
              <MuiTextField
                id="edit-about"
                style={{width: 'calc(100% - 24px)'}}
                multiLine={true}
                value={this.state.about}
                onChange={this.onChange} />
            </CardText>
          </Tab>
          <Tab label="Preview" value="b">
            <CardText>
              <Markdown
                className="markdown-body"
                source={this.state.about} />
            </CardText>
          </Tab>
        </Tabs>
      </PropBarrier>
    );

    return (
      <MuiTextField
        {..._.omit(other, ['validators', 'element', 'hasError'])}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && (errors[name] || errorText)}
      />
    );
  }

}

export default MarkdownField;
