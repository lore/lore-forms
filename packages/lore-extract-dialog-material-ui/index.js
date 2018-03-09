var Generator = require('./generator');

module.exports = {

  command: "dialog",

  describe: "Creates a dialog that mirrors the behavior of the corresponding blueprint in lore-hook-dialog-material-ui",

  options: {
    params: '<filename>',

    options: {
      filename: {
        description: 'Name of the file(s) to extract, e.g. `post` or `post/create`',
        type: 'string'
      },
      template: {
        description: 'Name of the template to use for the dialog',
        type: 'string'
      },
      generic: {
        describe: 'Generate a version of the dialog that uses GenericForm instead of SchemaForm',
        type: 'boolean',
        default: false
      },
      explicit: {
        describe: 'Generate a version of the dialog that does not use any schemas. Use this version if you need full control of the dialog styling',
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
