import validator from 'validator';
import PayloadStates from '../constants/PayloadStates';

var isRequired = function(value) {
  if (value === null || value === undefined || validator.isEmpty(value)) {
    return 'This field is required'
  }
};

var isRequiredAndNumber = function(value) {
  if (value === null || value === undefined) {
    return 'This field is required'
  }

  // if (!validator.isNumeric(String(value))) {
  //   return 'Value must be a number'
  // }

  if (!validator.isDecimal(String(value))) {
    return 'Value must be a number'
  }
};

var isEmail = function(value) {
  if (!validator.isEmail(value)) {
    return 'Must be an email address'
  }
};

var isAscii = function(value) {
  if (value === null || value === undefined) {
    return;
  }

  if (!validator.isAscii(value)) {
    return 'This field is not allowed to have any special characters, symbols or accented letters (such as an umlaut, tilde or cedilla)';
  }
};

var isUsername = function(value) {
  if (value === null || value === undefined) {
    return;
  }

  // remove underscores
  var cleanedUsername = String(value).replace(/_/g, "");

  if (String(value).length < 5) {
    return 'Usernames must be at least 5 characters long';
  }

  if (
    !validator.isAlphanumeric(cleanedUsername) ||
    !validator.isLowercase(cleanedUsername)
  ) {
    return 'Usernames must be all lowercase and can only contain letters and numbers such a-z, 1-9, and _';
  }
};

var isPassword = function(value) {
  if (value === null || value === undefined) {
    return;
  }

  if (String(value).length < 6) {
    return 'Passwords must be at least 6 characters long';
  }

  if (String(value).indexOf(' ') >= 0) {
    return 'Passwords may not contain spaces';
  }

  if (!validator.isAscii(value)) {
    return 'Passwords may not contain special characters such as symbols or accented letters';
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
    return 'Must be a valid url'
  }
};

var isBooleanRequired = function(value) {
  if (value === true || value === false) {
    return;
  }

  return 'This field is required';
};

var isBooleanTrue = function(value) {
  if (value !== true) {
    return 'This field is required';
  }
};

function usernameIsAvailable(model) {
  return function(value) {
    if (!model) return;

    if (model.state === PayloadStates.ERROR_FETCHING) {
      return model.error.username[0];
    }

    if (model.state !== PayloadStates.RESOLVED) {
      return 'Checking availability...'
    }
  }
}

function emailIsAvailable(model) {
  return function(value) {
    if (!model) return;

    if (model.state === PayloadStates.ERROR_FETCHING) {
      return model.error.email[0];
    }

    if (model.state !== PayloadStates.RESOLVED) {
      return 'Checking availability...'
    }
  }
}

function isInteger(value) {
  if (value === null || value === undefined) {
    return;
  }

  if (typeof value === 'number') {
    return;
  }

  if (!validator.isInt(String(value))) {
    return 'Must be an integer (1,2,3...)';
  }
}

export default {
  isRequired: isRequired,
  isEmail: isEmail,
  matchesPassword: matchesPassword,
  isUsername: isUsername,
  isPassword: isPassword,
  isAscii: isAscii,
  isUrl: isUrl,
  usernameIsAvailable: usernameIsAvailable,
  emailIsAvailable: emailIsAvailable,
  isInteger: isInteger,
  number: {
    isRequired: isRequiredAndNumber,
  },
  boolean: {
    isRequired: isBooleanRequired,
    isTrue: isBooleanTrue,
  },
  model: {
    isResolved: isResolved
  }
};
