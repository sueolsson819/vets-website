// import fullSchema from 'vets-json-schema/dist/XX-230-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

// **** form basics ****
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field label',
//               'ui:widget': 'radio',
//               'ui:options': {
//                 widgetProps: {
//                   'First option': { 'data-info': 'first_1' },
//                   'Second option': { 'data-info': 'second_2' },
//                 },
//                 // Only added to the radio when it is selected
//                 // a11y requirement: aria-describedby ID's *must* exist on the page;
//                 // and we conditionally add content based on the selection
//                 selectedProps: {
//                   'First option': { 'aria-describedby': 'some_id_1' },
//                   'Second option': { 'aria-describedby': 'some_id_2' },
//                 },
//               },
//             },
//           },
//           schema: {
//             type: 'object',
//             required: ['myField'],
//             properties: {
//               myField: {
//                 type: 'string',
//                 enum: ['First option', 'Second option'],
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** form validation ****
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field label',
//               'ui:validations': [
//                 (errors, field) => {
//                   if (field && field.startsWith('bad')) {
//                     errors.addError(
//                       "Sorry, you can't start this field with 'bad'",
//                     );
//                     console.log('errors', errors);
//                   }
//                 },
//               ],
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** form validation, 2 fields ****
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             'ui:description': 'Test description required (*Required)',
//             email: {
//               'ui:title': 'Email',
//             },
//             confirmEmail: {
//               'ui:title': 'Confirm email',
//             },
//             'ui:validations': [
//               (errors, field) => {
//                 if (!field.email && !field.confirmEmail) {
//                   errors.email.addError('');
//                   errors.confirmEmail.addError('');
//                 }
//               },
//             ],
//           },
//           schema: {
//             type: 'object',
//             // required: ['email'],
//             properties: {
//               email: {
//                 type: 'string',
//               },
//               confirmEmail: {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** form validation, pattern matching  ****
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field',
//               'ui:errorMessages': {
//                 pattern: 'Sorry, you must enter all digits',
//               },
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'string',
//                 pattern: '^[0-9]*$',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Conditional required fields
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field',
//             },
//             myOtherField: {
//               'ui:title': 'My field',
//               'ui:required': formData => formData.myField === 'test',
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'string',
//               },
//               myOtherField: {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Conditionally displayed fields - Expand under fields
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field',
//               'ui:widget': 'yesNo',
//               'ui:options': {
//                 labels: {
//                   Y: 'Yes, this is what I want',
//                   N: 'No, I do not want this',
//                 },
//                 widgetProps: {
//                   Y: { 'data-info': 'yes' },
//                   N: { 'data-info': 'no' },
//                 },
//                 // Only added to the radio when it is selected
//                 // a11y requirement: aria-describedby ID's *must* exist on the page;
//                 // and we conditionally add content based on the selection
//                 selectedProps: {
//                   Y: { 'aria-describedby': 'some_id' },
//                   N: { 'aria-describedby': 'different_id' },
//                 },
//               },
//             },
//             myConditionalField: {
//               'ui:title': 'My conditional field',
//               'ui:options': {
//                 expandUnder: 'myField',
//               },
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'boolean',
//               },
//               myConditionalField: {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Conditionally hidden fields
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field',
//               'ui:widget': 'yesNo',
//               'ui:options': {
//                 labels: {
//                   Y: 'Yes, this is what I want',
//                   N: 'No, I do not want this',
//                 },
//                 widgetProps: {
//                   Y: { 'data-info': 'yes' },
//                   N: { 'data-info': 'no' },
//                 },
//                 // Only added to the radio when it is selected
//                 // a11y requirement: aria-describedby ID's *must* exist on the page;
//                 // and we conditionally add content based on the selection
//                 selectedProps: {
//                   Y: { 'aria-describedby': 'some_id' },
//                   N: { 'aria-describedby': 'different_id' },
//                 },
//               },
//             },
//             myConditionalField: {
//               'ui:title': 'My conditional field',
//               'ui:options': {
//                 // hideIf: formData => formData.myField !== true,
//                 hideIf: () => true,
//               },
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'boolean',
//               },
//               myConditionalField: {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Conditional pages | Doesn't seem to work ****
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           depends: form => form.fieldOnAnotherPage !== 'test',
//           uiSchema: {
//             myField: {
//               'ui:title': 'My field',
//               'ui:widget': 'yesNo',
//               'ui:options': {
//                 // hideIf: false,
//                 labels: {
//                   Y: 'Yes, this is what I want',
//                   N: 'No, I do not want this',
//                 },
//                 widgetProps: {
//                   Y: { 'data-info': 'yes' },
//                   N: { 'data-info': 'no' },
//                 },
//                 // Only added to the radio when it is selected
//                 // a11y requirement: aria-describedby ID's *must* exist on the page;
//                 // and we conditionally add content based on the selection
//                 selectedProps: {
//                   Y: { 'aria-describedby': 'some_id' },
//                   N: { 'aria-describedby': 'different_id' },
//                 },
//               },
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: {
//                 type: 'boolean',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** View-only data - fields
// **** Since we've prefixed confirmEmailwith view:, that field will be removed before submitting the completed form.
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             email: {
//               'ui:title': 'Email',
//             },
//             'view:confirmEmail': {
//               'ui:title': 'Confirm email',
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               email: {
//                 type: 'string',
//               },
//               'view:confirmEmail': {
//                 type: 'string',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** View-only data - objects | Does  not seem to work ****
// **** If you prefix an object with view:, something slightly different will happen:
// In this case, the form data that's submitted when a user completes a form would be:
// {
//   email: 'test@test.com',
//   confirmEmail: 'test@test.com'
// }
// If we had left off the view:prefix it would be:
// {
//   emails: {
//     email: 'test@test.com',
//     confirmEmail: 'test@test.com'
//   }
// }

// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             email: {
//               'ui:title': 'Email',
//             },
//             'view:confirmEmail': {
//               'ui:title': 'Confirm email',
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               'view:emails': {
//                 email: {
//                   type: 'string',
//                 },
//                 confirmEmail: {
//                   type: 'string',
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Advanced - Using Common Definitions
// import fullSchema from 'vets-json-schema/dist/10-10EZ-schema.json';

// const { email } = fullSchema.properties;
// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             email: {
//               'ui:title': 'My field label',
//             },
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               email,
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** Advanced - Using a common front-end definition
import fullSchema from 'vets-json-schema/dist/10-10CG-schema.json';
import { VetInfo } from 'applications/caregivers/components/AdditionalInfo';
import { veteranFields } from 'applications/caregivers/definitions/constants';
import { vetInputLabel } from 'applications/caregivers/definitions/UIDefinitions/veteranUI';
import { fullNameUI } from 'applications/caregivers/definitions/UIDefinitions/sharedUI';

const { veteran } = fullSchema.properties;
const veteranProps = veteran.properties;

const { fullName } = fullSchema.definitions;

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'new-form-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: 'XX-230',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
    //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
    //   saved: 'Your new form benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for new form benefits.',
    noAuth:
      'Please sign in again to continue your application for new form benefits.',
  },
  title: 'My new form',
  defaultDefinitions: { fullName },
  chapters: {
    chapter1: {
      title: 'Chapter 1',
      pages: {
        page1: {
          path: 'first-page',
          title: 'First Page',
          uiSchema: {
            'ui:description': VetInfo({ headerInfo: false }),
            [veteranFields.fullName]: fullNameUI(vetInputLabel),
          },
          schema: {
            type: 'object',
            properties: {
              [veteranFields.fullName]: veteranProps.fullName,
            },
          },
        },
      },
    },
  },
};

// **** Advanced - Modifying common definitions
// import set from 'platform/utilities/data/set';
// import fullSchema from 'vets-json-schema/dist/10-10CG-schema.json';
// import { VetInfo } from 'applications/caregivers/components/AdditionalInfo';
// import { veteranFields } from 'applications/caregivers/definitions/constants';
// import { vetInputLabel } from 'applications/caregivers/definitions/UIDefinitions/veteranUI';
// import { fullNameUI } from 'applications/caregivers/definitions/UIDefinitions/sharedUI';

// const { veteran } = fullSchema.properties;
// const veteranProps = veteran.properties;

// const { fullName } = fullSchema.definitions;

// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: { fullName },
//   chapters: {
//     chapter1: {
//       title: 'Chapter 1',
//       pages: {
//         page1: {
//           path: 'first-page',
//           title: 'First Page',
//           uiSchema: {
//             'ui:description': VetInfo({ headerInfo: true }),
//             myField: {
//               'ui:title': 'My field',
//               'ui:widget': 'yesNo',
//               'ui:options': {
//                 labels: {
//                   Y: 'Yes, this is what I want',
//                   N: 'No, I do not want this',
//                 },
//                 widgetProps: {
//                   Y: { 'data-info': 'yes' },
//                   N: { 'data-info': 'no' },
//                 },
//                 // Only added to the radio when it is selected
//                 // a11y requirement: aria-describedby ID's *must* exist on the page;
//                 // and we conditionally add content based on the selection
//                 selectedProps: {
//                   Y: { 'aria-describedby': 'some_id' },
//                   N: { 'aria-describedby': 'different_id' },
//                 },
//               },
//             },
//             [veteranFields.fullName]: fullNameUI(vetInputLabel),
//             [veteranFields.fullName]: set(
//               'ui:options.expandUnder',
//               'myField',
//               fullNameUI(vetInputLabel),
//             ),
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               myField: { type: 'boolean' },
//               [veteranFields.fullName]: veteranProps.fullName,
//             },
//           },
//         },
//       },
//     },
//   },
// };

// **** How to bypass SchemaForm
// import CustomPage from '../components/CustomPage';
// import CustomPageReview from '../components/CustomReviewPage';

// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   submitUrl: '/v0/api',
//   trackingPrefix: 'new-form-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: 'XX-230',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your new form benefits application (XX-230) is in progress.',
//     //   expired: 'Your saved new form benefits application (XX-230) has expired. If you want to apply for new form benefits, please start a new application.',
//     //   saved: 'Your new form benefits application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound: 'Please start over to apply for new form benefits.',
//     noAuth:
//       'Please sign in again to continue your application for new form benefits.',
//   },
//   title: 'My new form',
//   defaultDefinitions: {},
//   chapters: {
//     chapterOneName: {
//       // Chapter config here...
//       pages: {
//         mySchemalessPage: {
//           path: 'my-schemaless-page',
//           title: 'Bypassing the SchemaForm',
//           CustomPage,
//           CustomPageReview,
//           schema: {
//             // This does still need to be here or it'll throw an error
//             type: 'object',
//             properties: {}, // But the properties can be empty
//           },
//           uiSchema: {},
//         },
//       },
//     },
//   },
// };

export default formConfig;
