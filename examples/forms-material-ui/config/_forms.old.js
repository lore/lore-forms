// /**
//  * Configuration file for forms
//  *
//  * This file is where you define overrides for the default forms behavior.
//  */
// import React from 'react';
// import { Template as DefaultTemplate } from 'lore-react-forms';
// import CardFormTemplate from '../src/components/templates/CardFormTemplate';
// import CustomTemplate from '../src/components/templates/CustomTemplate';
// import { TextField, DynamicTextField, SelectField } from 'lore-react-forms-material-ui';
// // import ConfigConnect from 'lore-hook-forms-material-ui/ConfigConnect';
// // import ConfigConnect from '../hooks/lore-hook-forms-material-ui/ConfigConnect';
// import { Connect } from '../hooks/lore-hook-connect'
//
// import ActionTemplate from '../src/components/users/templates/Action';
// import ActionsTemplate from '../src/components/users/templates/Actions';
// import FieldTemplate from '../src/components/users/templates/Field';
// import FieldsTemplate from '../src/components/users/templates/Fields';
// import FormTemplate from '../src/components/users/templates/Form';
// import FormStepTemplate from '../src/components/users/templates/FormStep';
// import FormStepsTemplate from '../src/components/users/templates/FormSteps';
// import RequestTemplate from '../src/components/users/templates/Request';
// import StepTemplate from '../src/components/users/templates/Step';
// import StepperTemplate from '../src/components/users/templates/Stepper';
//
// export default {
//
//   templates: {
//     defaultNew: {
//       Action: ActionTemplate,
//       Actions: ActionsTemplate,
//       Field: FieldTemplate,
//       Fields: FieldsTemplate,
//       Form: FormTemplate,
//       FormStep: FormStepTemplate,
//       FormSteps: FormStepsTemplate,
//       Request: RequestTemplate,
//       Step: StepTemplate,
//       Stepper: StepperTemplate,
//     },
//     // default: DefaultTemplate,
//     card: CardFormTemplate,
//     custom: CustomTemplate
//   },
//
//   typeFieldMap: {
//
//     string: function(name, attributes) {
//       return (
//         <TextField
//           {...attributes}
//           name={name}
//           style={{ width: '100%' }}
//         />
//       );
//     },
//
//     dynamicString: function(name, attributes) {
//       // Connect = Connect || ConfigConnect();
//       return (
//         <Connect callback={attributes.connect}>
//           <DynamicTextField
//             {...attributes}
//             name={name}
//             style={{ width: '100%' }}
//           />
//         </Connect>
//       );
//     },
//
//     // text: function(name, attributes) {
//     //   return (
//     //     <TextField
//     //       {...attributes}
//     //       name={name}
//     //       style={{ width: '100%' }}
//     //     />
//     //   );
//     // },
//
//     // checkbox: function(name, attributes) {
//     //   return (
//     //     <CheckboxField
//     //       {...attributes}
//     //       name={name}
//     //     />
//     //   );
//     // },
//
//     // number: function(name, attributes) {
//     //   return (
//     //     <NumberField
//     //       {...attributes}
//     //       name={name}
//     //       style={{ width: '100%' }}
//     //     />
//     //   );
//     // },
//
//     select: function(name, attributes) {
//       // Connect = Connect || ConfigConnect();
//       return (
//         <Connect callback={attributes.getOptions}>
//           <SelectField
//             {...attributes}
//             name={name}
//             style={{ width: '100%' }}
//           />
//         </Connect>
//       );
//     },
//
//     autocomplete: function(name, attributes) {
//       // Connect = Connect || ConfigConnect();
//       return (
//         <Connect callback={attributes.getOptions}>
//           <AutoCompleteField
//             {...attributes}
//             name={name}
//             style={{ width: '100%' }}
//           />
//         </Connect>
//       );
//     }
//
//   },
//
//   typeActionMap: {
//
//     // cancel: function(name, attributes) {
//     //   return (
//     //     <mui.FlatButton
//     //       key={name}
//     //       label={attributes.label || 'Cancel'}
//     //       onTouchTap={function() {}}
//     //     />
//     //   );
//     // },
//
//     // submit: function(name, attributes, onSubmit) {
//     //   return (
//     //     <mui.FlatButton
//     //       key={name}
//     //       label={attributes.label || 'Submit'}
//     //       primary={true}
//     //       onTouchTap={onSubmit}
//     //     />
//     //   );
//     // },
//
//     flat: function(name, attributes) {
//       return (
//         <mui.FlatButton
//           {...attributes}
//           key={name}
//         />
//       );
//     },
//
//     raised: function(name, attributes, onSubmit) {
//       return (
//         <mui.FlatButton
//           {...attributes}
//           key={name}
//           primary={true}
//         />
//       );
//     }
//
//   }
//
// };
