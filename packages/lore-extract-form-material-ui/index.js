var Generator = require('./generator');

module.exports = {

  command: "form",

  describe: "Creates a form that mirrors the behavior of the corresponding blueprint in lore-hook-form-material-ui",

  options: {
    params: '<filename>',

    options: {
      filename: {
        description: 'Name of the file(s) to extract, e.g. `post` or `post/create`',
        type: 'string'
      },
      template: {
        description: 'Name of the template to use for the form',
        type: 'string'
      },
      generic: {
        describe: 'Generate a version of the form that uses GenericForm instead of SchemaForm',
        type: 'boolean',
        default: false
      },
      explicit: {
        describe: 'Generate a version of the form that does not use any schemas. Use this version if you need full control of the diaog styling',
        type: 'boolean',
        default: false
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
