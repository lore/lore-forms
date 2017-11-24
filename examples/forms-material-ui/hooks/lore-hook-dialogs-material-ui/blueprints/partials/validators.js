import _ from 'lodash';

export default function(attributes) {
  return _.mapValues(attributes, function(attribute, key, index) {
    return [];
  });
}
