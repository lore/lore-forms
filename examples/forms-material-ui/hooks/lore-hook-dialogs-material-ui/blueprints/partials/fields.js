import _ from 'lodash';

export default function(attributes) {
  const result = {};

  _.mapValues(attributes, function(attribute, key, index) {
    if (attribute.type === 'string') {
      result[key] = {
        type: 'string',
        props: {
          floatingLabelText: _.upperFirst(key),
          style: { width: '100%' },
          name: key
        }
      };
    }

    if (attribute.type === 'text') {
      result[key] = {
        type: 'text',
        props: {
          floatingLabelText: _.upperFirst(key),
          style: { width: '100%' },
          name: key,
          multiLine: true
        }
      };
    }

    if (attribute.type === 'model') {
      result[key] = {
        type: 'select',
        props: {
          floatingLabelText: _.upperFirst(key),
          style: { width: '100%' },
          name: key,
          getOptions: (getState, props) => {
            return {
              options: getState(`${attribute.model}.find`)
            }
          },
          field: 'id'
        }
      }
    }

    // return {
    //   type: attribute.type,
    //   props: {}
    // }
  });

  return result;
}
