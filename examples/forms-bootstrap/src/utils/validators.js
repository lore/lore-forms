import validator from 'validator';
import PayloadStates from '../constants/PayloadStates';

function isRequired(value) {
  if (value === null || value === undefined || validator.isEmpty(value)) {
    return 'This field is required'
  }
}

function isRequiredAndNumber(value) {
  if (value === null || value === undefined || !validator.isNumeric(String(value))) {
    return 'This field is required'
  }
}

function isRequiredAndBoolean(value) {
  if (value === true || value === false) {
    return;
  }

  return 'This field is required';
}

function isEmail(value) {
  if (!validator.isEmail(value)) {
    return 'Must be an email address'
  }
}

function matchesPassword(password) {
  return function(value) {
    if (value !== password) {
      return 'Passwords must match'
    }
  }
}

function isResolved(model, value) {
  if (!model) return;

  if (model.state !== PayloadStates.RESOLVED) {
    return 'Checking availability...'
  }
}

function isUrl(value) {
  if (value === null || value === undefined || value === '') {
    return;
  }

  if (!validator.isURL(value)) {
    return 'Must be a url'
  }
}

function usernameIsAvailable(model) {
  return function(value) {
    if (!model) return;

    if (model.state === PayloadStates.FETCHING) {
      return 'Checking availability...'
    }

    if (model.state === PayloadStates.RESOLVED) {
      return 'Username is already taken'
    }

    // if (
    //   model.state === PayloadStates.ERROR_FETCHING ||
    //   model.state === PayloadStates.NOT_FOUND
    // ) {
    //   return;
    // }
  }
}

function isUsername(value) {
  if (value === null || value === undefined) {
    return;
  }

  if (String(value).length < 3) {
    return 'Username must be at least 3 characters long';
  }

  if (
    !validator.isAlphanumeric(value) ||
    !validator.isLowercase(value)
  ) {
    return 'Usernames must be all lowercase and can only contain letters and numbers such a-z, 1-9, and _';
  }
}

function isPassword(value) {
  if (value === null || value === undefined) {
    return;
  }

  if (String(value).length < 6) {
    return 'Password must be at least 6 characters long';
  }
}

export default {
  isRequired: isRequired,
  isEmail: isEmail,
  isUrl: isUrl,
  isUsername: isUsername,
  isPassword: isPassword,
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
