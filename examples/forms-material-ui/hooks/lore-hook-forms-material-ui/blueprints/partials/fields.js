import _ from 'lodash';

export default function(attributes) {
  return _.mapValues(attributes, function(attribute, key, index) {
    if (attribute.type === 'string') {
      return {
        type: 'string',
        props: {
          floatingLabelText: _.capitalize(key),
          style: { width: '100%' },
          name: key
        }
      }
    }

    if (attribute.type === 'text') {
      return {
        type: 'text',
        props: {
          floatingLabelText: _.capitalize(key),
          style: { width: '100%' },
          name: key,
          multiLine: true
        }
      }
    }

    return {
      type: attribute.type,
      props: {}
    }
  });
}
