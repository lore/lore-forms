var path = require('path');
var camelCase = require('camel-case');
var Generator = require('lore-generate').Generator;
var _ = require('lodash');
var es6Targets = require('./targets/es6');

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  before: function(options) {
    var validBlueprints = ['create', 'destroy', 'update'];
    var validTemplates = ['optimistic', 'overlay', 'wizard'];

    var tokens = options.filename.split('/');
    if (tokens.length > 2) {
      throw new Error('Invalid format; filename must look like `model` or `model/blueprint`, e.g. `lore extract form post/create`');
    }

    // set the modelName so the templates can write it into the file
    options.modelName = camelCase(tokens[0]);

    if (options.template) {
      if (validTemplates.indexOf(options.template) < 0) {
        throw new Error('Invalid template "' + options.template + '"; must match one of ' + validTemplates.join(', '));
      }
    }

    if (tokens.length > 1) {
      options.blueprintName = camelCase(tokens[1]);

      if (validBlueprints.indexOf(options.blueprintName) < 0) {
        throw new Error('Invalid blueprint "' + options.blueprintName + '"; must match one of ' + validBlueprints.join(', '));
      }
    }

    if (tokens.length > 1) {
      this.logger.info('Extracting `' + options.blueprintName + '` form for the `' + options.modelName + '` model...');
    } else {
      this.logger.info('Extracting all formss for the `' + options.modelName + '` model...');
    }
  },

  after: function(options, targets) {
    // console.log(options);
    // console.log(targets);
    // var filename = options.filename;
    // var dest = targets[0].destination.relativePath;
    // this.logger.info('Created a new file `' + filename + '` at `' + dest + '`');
    targets.forEach(function(target) {
      this.logger.info('Extracted form to `' + target.destination.relativePath + '`');
    }.bind(this));
  },

  targets: function(options) {
    var modelName = options.modelName;
    var blueprintName = options.blueprintName;
    var template = options.template || 'overlay';

    if (blueprintName) {
      return es6Targets(modelName, blueprintName, template, options)
    } else {
      return _.merge(
        {},
        es6Targets(modelName, 'create', template, options),
        es6Targets(modelName, 'destroy', template, options),
        es6Targets(modelName, 'update', template, options),
      );
    }
  }

});
