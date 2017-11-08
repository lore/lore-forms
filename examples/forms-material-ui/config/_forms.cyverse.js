// /**
//  * Configuration file for forms
//  *
//  * This file is where you define overrides for the default forms behavior.
//  */
// import React from 'react';
// import _ from 'lodash';
// import { FormSection, PropBarrier } from 'lore-react-forms';
// import {
//   Action as ActionSchema,
//   Actions as ActionsSchema,
//   Field as FieldSchema,
//   Fields as FieldsSchema,
//   Form as FormSchema,
//   FormStep as FormStepSchema,
//   FormSteps as FormStepsSchema,
//   Request as RequestSchema,
//   Step as StepSchema,
//   Stepper as StepperSchema,
//   SchemaForm
// } from 'lore-react-forms-material-ui';
//
// import {
//   TextField,
//   PasswordField,
//   ConnectedSelectField,
//   AutoCompleteField,
//   CheckboxField,
//   MarkdownField,
// } from 'lore-react-forms-material-ui';
//
// import Markdown from 'react-markdown';
//
// const defaultSchema = {
//   Action: ActionSchema,
//   Actions: ActionsSchema,
//   Field: FieldSchema,
//   Fields: FieldsSchema,
//   Form: FormSchema,
//   FormStep: FormStepSchema,
//   FormSteps: FormStepsSchema,
//   Request: RequestSchema,
//   Step: StepSchema,
//   Stepper: StepperSchema
// };
//
// export default {
//
//   templates: {
//     default: SchemaForm
//   },
//
//   schemas: {
//     default: defaultSchema
//   },
//
//   fields: {
//
//     // custom: function(common, props) {
//     //   return render(this.props);
//     // },
//
//     string: function(common, props) {
//       if (props.description) {
//         return (
//           <FormSection>
//             <TextField
//               {...common}
//               {...props}
//               style={{ width: '100%' }}
//             />
//             <PropBarrier className="form-field-explanation">
//               <div className="markdown-body">
//                 <Markdown source={props.description || ''} />
//               </div>
//             </PropBarrier>
//           </FormSection>
//         );
//       }
//
//       return (
//         <TextField
//           {...common}
//           {...props}
//           style={{ width: '100%' }}
//         />
//       );
//     },
//
//     password: function(common, props) {
//       if (props.description) {
//         return (
//           <FormSection>
//             <PasswordField
//               {...common}
//               {...props}
//               style={{ width: '100%' }}
//             />
//             <PropBarrier className="form-field-explanation">
//               <div className="markdown-body">
//                 <Markdown source={props.description || ''} />
//               </div>
//             </PropBarrier>
//           </FormSection>
//         );
//       }
//
//       return (
//         <PasswordField
//           {...common}
//           {...props}
//           style={{ width: '100%' }}
//         />
//       );
//     },
//
//     text: function(common, props) {
//       if (props.description) {
//         return (
//           <FormSection>
//             <TextField
//               {...common}
//               {...props}
//               multiLine={true}
//               style={{ width: '100%' }}
//             />
//             <PropBarrier className="form-field-explanation">
//               <div className="markdown-body">
//                 <Markdown source={props.description || ''} />
//               </div>
//             </PropBarrier>
//           </FormSection>
//         );
//       }
//
//       return (
//         <TextField
//           {...common}
//           {...props}
//           multiLine={true}
//           style={{ width: '100%' }}
//         />
//       );
//     },
//
//     select: function(common, props) {
//       if (props.description) {
//         return (
//           <FormSection>
//             <ConnectedSelectField
//               {...common}
//               {...props}
//               style={{ width: '100%' }}
//             />
//             <PropBarrier className="form-field-explanation">
//               <div className="markdown-body">
//                 <Markdown source={props.description || ''} />
//               </div>
//             </PropBarrier>
//           </FormSection>
//         );
//       }
//
//       return (
//         <ConnectedSelectField
//           {...common}
//           {...props}
//           style={{ width: '100%' }}
//         />
//       )
//     },
//
//     autocomplete: function(common, props) {
//       return (
//         <AutoCompleteField
//           {...common}
//           {...props}
//           style={{ width: '100%' }}
//         />
//       )
//     },
//
//     boolean: function(common, props) {
//       if (props.description) {
//         return (
//           <FormSection>
//             <CheckboxField
//               {...common}
//               {...props}
//               style={{ width: '100%', marginTop: '36px' }}
//             />
//             <PropBarrier className="form-field-explanation" style={{ marginLeft: '40px', paddingTop: '8px' }}>
//               <div className="markdown-body">
//                 <Markdown source={props.description || ''} />
//               </div>
//             </PropBarrier>
//           </FormSection>
//         );
//       }
//
//       return (
//         <CheckboxField
//           {...common}
//           {...props}
//           style={{ width: '100%', marginTop: '36px' }}
//         />
//       )
//     },
//
//     markdown: function(common, props) {
//       return (
//         <FormSection style={{ marginLeft: '-16px', marginRight: '-16px' }}>
//           <MarkdownField
//             {...common}
//             {...props}
//             style={{ width: '100%' }}
//           />
//         </FormSection>
//       )
//     },
//   }
//
// };
