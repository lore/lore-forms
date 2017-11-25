import React from 'react';
import { CircularProgress } from 'material-ui';
import { NavigationCheck, AvNotInterested } from 'material-ui/svg-icons';
import { DynamicTextField } from 'lore-react-forms-material-ui';
import { Connect } from 'lore-hook-connect';
import PayloadStates from '../../constants/PayloadStates';

function usernameConnect(getState, props) {
  const username = props.data[props.name];

  if (!username) {
    return {
      _model: null
    }
  }

  return {
    _model: getState('user.first', {
      where: {
        username: username
      }
    })
  }
}

function usernameGetMessage(model) {
  const options = {
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
          top: '36px',
          right: '8px'
        }}
        size={16}
        thickness={2} />
    );
    options.message = 'Checking availability...';
  } else if (model.state === PayloadStates.NOT_FOUND) {
    options.icon = (
      <NavigationCheck
        style={{
          position: 'absolute',
          top: '36px',
          right: '0px',
          color: 'green'
        }} />
    );
    options.message = 'Username is available';
  } else if (model.state === PayloadStates.RESOLVED) {
    options.icon = (
      <AvNotInterested
        style={{
          position: 'absolute',
          top: '36px',
          right: '0px',
          color: 'red'
        }} />
    );
    options.message = model.error.username;
  }

  return options;
}

class UsernameField extends React.Component {

  render() {
    const {
      name,
      props
    } = this.props;

    return (
      <Connect callback={usernameConnect} {...this.props}>
        <DynamicTextField
          getMessage={usernameGetMessage}
          style={{ width: '100%' }}
          {...this.props}
        />
      </Connect>
    )
  }

}

export default UsernameField;
