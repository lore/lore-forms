var path = require('path');
var camelCase = require('camel-case');
// var Generator = require('lore-generate').Generator;
var Generator = require('../lore-generate/generator');
var _ = require('lodash');

function getFilename(model, blueprint) {
  return './src/forms/' + model + '/' + blueprint + '.js';
}

function getBlueprintPath(blueprint, template, options) {
  if (options.es6 || options.esnext || true) {
    return './es6/' + blueprint + '.' + template + '.js.njk';
  }
}

function getSingleBlueprint(model, blueprint, template, options, result) {
  result = result || {};
  result[getFilename(model, blueprint)] = { template: getBlueprintPath(blueprint, template, options) };
  return result;
}

function getAllBlueprints(model, template, options) {
  var result = {};
  getSingleBlueprint(model, 'create', template, options, result);
  getSingleBlueprint(model, 'destroy', template, options, result);
  // getSingleBlueprint(model, 'find', template, options, result);
  // getSingleBlueprint(model, 'get', template, options, result);
  getSingleBlueprint(model, 'update', template, options, result);
  return result;
}

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  before: function(options) {
    var validBlueprints = ['create', 'destroy', 'update'];
    var validTemplates = ['default', 'overlay', 'wizard'];

    var tokens = options.filename.split('/');
    if (tokens.length > 2) {
      throw new Error('Invalid format; filename must look like `model` or `model/blueprint`, e.g. `lore extract form post/create`');
    }

    // set the modelName so the templates can write it into the file
    options.modelName = camelCase(tokens[0]);
    var modelPath = path.resolve(options.projectDirectory, './src/models/' + options.modelName + '.js');
    var config = require(modelPath);

    options.attributes = config.attributes || {};

    // remove extra newlines from templates
    options.transformData = function(data) {
      data = data.split('\n\n\n\n').join('\n');
      data = data.split('\n\n\n').join('\n');
      data = data.split('\n\n').join('\n');
      return data;
    };

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
      this.logger.info('Extracting all forms for the `' + options.modelName + '` model...');
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
    var template = options.template || 'default';

    if (blueprintName) {
      return getSingleBlueprint(modelName, blueprintName, template, options);
    } else {
      return getAllBlueprints(modelName, template, options);
    }
  }

});
