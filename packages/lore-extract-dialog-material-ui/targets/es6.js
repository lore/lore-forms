var path = require('path');

function es6(template) {
  return path.join('es6', template);
}

module.exports = function(model, blueprint, template) {
  if (template === 'optimistic') {
    return {
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Optimistic.js`]:         { template: es6(`${blueprint}/${template}/Optimistic.js.njk`) }
    }
  }

  if (template === 'overlay') {
    return {
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Overlay.js`]:            { template: es6(`${blueprint}/${template}/Overlay.js.njk`) }
    }
  }

  if (template === 'wizard') {
    return {
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Wizard.js`]:             { template: es6(`${blueprint}/${template}/Wizard.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/forms/Confirmation.js`]: { template: es6(`${blueprint}/${template}/forms/Confirmation.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/forms/Step.js`]:         { template: es6(`${blueprint}/${template}/forms/Step.js.njk`) }
    }
  }
};
