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
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
