var path = require('path');

function es6(template) {
  return path.join('es6', template);
}

module.exports = function(model, blueprint, template, options) {
  let modification = '';

  if (options.generic) {
    modification = '.generic';
  }

  if (options.explicit) {
    modification = '.explicit';
  }

  if (template === 'optimistic') {
    return {
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Optimistic.js`]:         {
        template: es6(`${blueprint}/${template}/Optimistic.js${modification}.njk`)
      }
    };
  }

  if (template === 'overlay') {
    return {
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Overlay.js`]:            {
        template: es6(`${blueprint}/${template}/Overlay.js${modification}.njk`)
      }
    };
  }

  if (template === 'wizard') {
    if (options.explicit) {
      return {
        [`./src/dialogs/${model}/${blueprint}/_common/Navigation.js`]: { template: es6(`${blueprint}/${template}.explicit/_common/Navigation.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/_common/Steps.js`]:      { template: es6(`${blueprint}/${template}.explicit/_common/Steps.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/_utils/validators.js`]:  { template: es6(`${blueprint}/${template}.explicit/_utils/validators.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/forms/Confirmation.js`]: { template: es6(`${blueprint}/${template}.explicit/forms/Confirmation.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/forms/StepOne.js`]:      { template: es6(`${blueprint}/${template}.explicit/forms/StepOne.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/forms/StepTwo.js`]:      { template: es6(`${blueprint}/${template}.explicit/forms/StepTwo.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}.explicit/index.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/Wizard.js`]:             { template: es6(`${blueprint}/${template}.explicit/Wizard.js.njk`) }
      };
    }

    if (options.generic) {
      return {
        [`./src/dialogs/${model}/${blueprint}/_common/Navigation.js`]: { template: es6(`${blueprint}/${template}.generic/_common/Navigation.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/_common/Steps.js`]:      { template: es6(`${blueprint}/${template}.generic/_common/Steps.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/_utils/config.js`]:      { template: es6(`${blueprint}/${template}.generic/_utils/config.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/_utils/validators.js`]:  { template: es6(`${blueprint}/${template}.generic/_utils/validators.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/forms/Confirmation.js`]: { template: es6(`${blueprint}/${template}.generic/forms/Confirmation.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/forms/Step.js`]:         { template: es6(`${blueprint}/${template}.generic/forms/Step.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/formMap.js`]:            { template: es6(`${blueprint}/${template}.generic/formMap.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}.generic/index.js.njk`) },
        [`./src/dialogs/${model}/${blueprint}/Wizard.js`]:             { template: es6(`${blueprint}/${template}.generic/Wizard.js.njk`) }
      };
    }

    return {
      [`./src/dialogs/${model}/${blueprint}/forms/Confirmation.js`]: { template: es6(`${blueprint}/${template}/forms/Confirmation.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/forms/Step.js`]:         { template: es6(`${blueprint}/${template}/forms/Step.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/formMap.js`]:            { template: es6(`${blueprint}/${template}/formMap.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/index.js`]:              { template: es6(`${blueprint}/${template}/index.js.njk`) },
      [`./src/dialogs/${model}/${blueprint}/Wizard.js`]:             { template: es6(`${blueprint}/${template}/Wizard.js.njk`) }
    };
  }
};
