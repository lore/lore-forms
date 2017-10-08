import validator from 'validator';
import PayloadStates from '../constants/PayloadStates';

var isRequired = function(value) {
  if (value === null || value === undefined || validator.isEmpty(value)) {
    return 'This field is required'
  }
};

var isRequiredAndNumber = function(value) {
  if (value === null || value === undefined || !validator.isNumeric(String(value))) {
    return 'This field is required'
  }
};

var isRequiredAndBoolean = function(value) {
  if (value === true || value === false) {
    return;
  }

  return 'This field is required';
};

var isEmail = function(value) {
  if (!validator.isEmail(value)) {
    return 'Must be an email address'
  }
};

var matchesPassword = function(password) {
  return function(value) {
    if (value !== password) {
      return 'Passwords must match'
    }
  }
};

var isResolved = function(model, value) {
  if (!model) return;

  if (model.state !== PayloadStates.RESOLVED) {
    return 'Checking availability...'
  }
};

var isUrl = function(value) {
  if (value === null || value === undefined || value === '') {
    return;
  }

  if (!validator.isURL(value)) {
    return 'Must be a url'
  }
};

function usernameIsAvailable(model) {
  return function(value) {
    if (!model) return;

    if (model.state === PayloadStates.FETCHING) {
      return 'Checking availability...'
    }

    if (model.state === PayloadStates.RESOLVED) {
      return 'Username is already taken'
    }

    if (
      model.state === PayloadStates.ERROR_FETCHING ||
      model.state === PayloadStates.NOT_FOUND
    ) {
      return;
    }
  }
}

export default {
  isRequired: isRequired,
  isEmail: isEmail,
  isUrl: isUrl,
  matchesPassword: matchesPassword,
  usernameIsAvailable: usernameIsAvailable,
  number: {
    isRequired: isRequiredAndNumber,
  },
  boolean: {
    isRequired: isRequiredAndBoolean,
  },
  model: {
    isResolved: isResolved
  }
};
