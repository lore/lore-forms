var path = require('path');
var camelCase = require('camel-case');
var Generator = require('lore-generate').Generator;
var _ = require('lodash');

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  before: function(options) {
    var tokens = options.filename.split('/');
    if (tokens.length > 2) {
      throw new Error('Invalid format; filename must look like `model` or `model/blueprint`, e.g. `lore extract dialog post/create`');
    }

    // set the modelName so the templates can write it into the file
    options.modelName = camelCase(tokens[0]);

    this.logger.info(`Extracting dialog for the ${options.modelName} model...`);
  },

  after: function(options, targets) {
    targets.forEach(function(target) {
      this.logger.info('Extracted dialog to `' + target.destination.relativePath + '`');
    }.bind(this));
  },

  targets: function(options) {
    return {};
  }

});
