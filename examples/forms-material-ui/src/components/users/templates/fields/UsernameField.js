import React from 'react';
import { Card, CardTitle, CircularProgress } from 'material-ui';
import { NavigationCheck, AvNotInterested } from 'material-ui/svg-icons';
import _ from 'lodash';
import { Field, PropBarrier } from 'lore-react-forms';
import DynamicTextField from './DynamicTextField';
import { Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

function usernameConnect(getState, props) {
  var username = props.data['username'];

  if (!username) {
    return {
      _model: null
    }
  }

  return {
    _model: getState('username.byId', {
      id: username
    })
  }
}

function usernameGetMessage(model) {
  var options = {
    icon: null,
    message: ''
  };

  if (!model) {
    return options;
  } else if (model.state === PayloadStates.FETCHING) {
    options.icon = (
      <CircularProgress
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '0px'
        }}
        size={16}
        thickness={2} />
    );
  } else if (model.state === PayloadStates.NOT_FOUND) {
    options.icon = (
      <NavigationCheck
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '0px',
          color: 'green'
        }} />
    );
  } else if (model.state === PayloadStates.RESOLVED) {
    options.icon = (
      <AvNotInterested
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '0px',
          color: 'red'
        }} />
    );
    options.message = model.error.username || 'Username already taken';
  }

  return options;
}

class UsernameField extends React.Component {

  render() {
    const {
      render,
      props,
      ...other
    } = this.props;

    return (
      <Connect callback={usernameConnect} {...other}>
        <DynamicTextField
          {...other}
          {...props}
          getMessage={usernameGetMessage}
          style={{ width: '100%' }}
        />
      </Connect>
    )
  }

}

export default UsernameField;
