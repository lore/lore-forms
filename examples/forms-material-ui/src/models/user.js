import React from 'react';
import { CircularProgress } from 'material-ui';
import { NavigationCheck, AvNotInterested } from 'material-ui/svg-icons';
import PayloadStates from '../constants/PayloadStates';
import validators from '../utils/validators';

export default {

  attributes: {
    name: {
      type: 'text'
    },
    username: {
      type: 'text'
    },
    password: {
      type: 'password'
    },
    countryId: {
      type: 'model',
      model: 'country'
    },
    regionId: {
      type: 'model',
      model: 'region'
    }
  },

  forms: {
    fields: {
      name: {
        type: 'string',
        data: '',
        validators: [validators.isRequired],
        options: {
          floatingLabelText: 'Name'
        }
      },
      username: {
        type: 'dynamicString',
        data: '',
        validators: [validators.isRequired],
        options: {
          floatingLabelText: 'Username',
          connect: function(getState, props) {
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
          },
          getMessage: function(model) {
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
        }
      },
      avatar: {
        type: 'string',
        data: '',
        validators: [validators.isUrl],
        options: {
          floatingLabelText: 'Avatar (optional)',
          hintText: 'https://some.image/url'
        }
      },
      password: {
        type: 'string',
        data: '',
        validators: [validators.isRequired],
        options: {
          floatingLabelText: 'Password'
        }
      },
      confirmPassword: {
        type: 'string',
        data: '',
        validators: function(data) {
          return [
            validators.isPasswordMatch.bind(null, data.password)
          ];
        },
        options: {
          floatingLabelText: 'Confirm Password'
        }
      },
      country: {
        type: 'select',
        data: null,
        validators: [validators.number.isRequired],
        options: {
          floatingLabelText: 'Country',
          field: 'name',
          // getOptions: function(getState, props) {
          //   return {
          //     options: getState('country.find')
          //   }
          // },
          options: (getState, props) => {
            return getState('country.find');
          },
        }
      },
      region: {
        type: 'select',
        data: null,
        validators: [validators.number.isRequired],
        options: {
          floatingLabelText: 'Region',
          field: 'name',
          // getOptions: function(getState, props) {
          //   var countryId = props.data.country;
          //
          //   if (countryId) {
          //     return {
          //       options: getState('region.find', {
          //         where: {
          //           countryId: countryId
          //         }
          //       })
          //     }
          //   }
          //
          //   return {
          //     options: {
          //       data: []
          //     }
          //   }
          // },
          options: (getState, props) => {
            const countryId = props.data.country;

            if (countryId) {
              return getState('region.find', {
                where: {
                  countryId: countryId
                }
              });
            }

            return {
              data: []
            };
          },
        }
      }
    },
    actions: {
      submit: {
        type: 'submit',
        options: {
          label: 'Save',
          // onTouchTap: this.onSubmit
        }
      }
    },
    onChange: function(name, value) {
      var state = {};
      state[name] = value;

      // reset the region when the country changes
      if (name === 'country') {
        state.region = null;
      }

      this.setState(state);
    }
  },

  properties: {

    /**
     * Override the idAttribute if the primary key in the resource is named
     * anything other than 'id'. Doing so will allow the other methods to
     * behave as expected, such as composing the expected url for CRUD
     * operations and being able to retrieve the primary key by 'model.id'
     */

    // idAttribute: 'id'

    /**
     * Override the initialize method if you need to save data for use
     * in other functions. This is especially useful if you have a nested
     * URL for an API endpoint, like /authors/:userId/books. In that case,
     * you can save the author here and refer to it when creating the URL
     * in the url() or urlRoot() method.
     */

    // initialize: function(attributes, options) {
    //   return;
    // },

    /**
     * Override the urlRoot if your API endpoint does not match the default
     * conventions. For example, given a model named 'bookAuthor', and assuming
     * an apiRoot of 'http://localhost:1337' with pluralize set to true, the
     * endpoint for creating a model is assumed to be 'http://localhost:1337/bookAuthors'
     * If this model is on a different server (such as http://localhost:3001) or the
     * endpoint is named something different (such as book_authors or books/:id/authors)
     * you will need to set that here; urlRoot can be either a string or a function
     */

    // urlRoot: function() {
    //   return 'https://api.example.com/endpoint'
    // },

    /**
     * Override the url method if you need complete control over the final URL
     * endpoint. This is especially useful when you have an endpoint like /user
     * or /profile that returns a single resource with information about the current
     * user and an id is not required. You'll also need to override this method if
     * the route doesn't use the primary key of the resource.
     */

    // url: function() {
    //   return 'https://api.example.com/unconventional/endpoint/123'
    // },

    /**
     * Override the parse method if you need to modify data before using
     * it in the application, such as converting timestamps or adding
     * properties to absorb breaking API changes.
     */

    // parse: function(resp, options) {
    //   return resp;
    // },

    /**
     * Override the sync method if you need to modify data before sending
     * it to the server.
     *
     * If you override this method the library will make no AJAX requests
     * for this model, so you'll need to make sure you implement the AJAX
     * call yourself or make a call to sync.apply(this, arguments).
     *
     * Use of 'sync' refers to sync method provided by the 'lore-models'
     * package, i.e. import { sync } from 'lore-models';
     */

    // sync: function() {
    //   return sync.apply(this, arguments);
    // }

  }

};
