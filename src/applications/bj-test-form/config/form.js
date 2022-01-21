// import fullSchema from 'vets-json-schema/dist/BJ-230-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import CurrencyWidget from 'platform/forms-system/src/js/widgets/CurrencyWidget';
import PhoneNumberWidget from 'platform/forms-system/src/js/widgets/PhoneNumberWidget';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'new-form-bj-test-form',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: 'BJ-230',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your new form benefits application (BJ-230) is in progress.',
    //   expired: 'Your saved new form benefits application (BJ-230) has expired. If you want to apply for new form benefits, please start a new application.',
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
  title: 'bj-test-form',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Chapter 1',
      pages: {
        page1: {
          // Using the default setup with a radio widget and simple required field
          path: 'first-page',
          title: 'First Page',
          uiSchema: {
            myField: {
              'ui:title': 'My field Label',
              'ui:widget': 'radio',
              'ui:options': {
                widgetProps: {
                  'First option': { 'data-info': 'first_1' },
                  'Second option': { 'data-info': 'second_2' },
                },
                selectedProps: {
                  'First option': { 'aria-describedby': 'some_id_1' },
                  'Second option': { 'aria-describedby': 'some_id_2' },
                },
              },
            },
          },
          schema: {
            type: 'object',
            required: ['myField'],
            properties: {
              myField: {
                type: 'string',
                enum: ['First option', 'Second option'],
              },
            },
          },
        },
        page2: {
          // This page uses a CurrencyWidget defined in the forms-system directory and does validation
          // around currency values but the documentation did not specify the field type and realized that
          // you have to set it to Number for it to work properly
          path: 'second-page',
          title: 'Second Page',
          uiSchema: {
            moneyField: {
              'ui:title': 'Give Me The Money',
              'ui:widget': CurrencyWidget,
            },
          },
          schema: {
            type: 'object',
            required: ['moneyField'],
            properties: {
              moneyField: {
                type: 'number',
              },
            },
          },
        },
        page3: {
          // This page is using a custom ui:errorMessage that validates the email address is in the
          // right format and then alerts the user if it isn't on submit
          path: 'third-page',
          title: 'Third Page',
          uiSchema: {
            emailField: {
              'ui:title': 'Provide your email please.',
              'ui:widget': 'email',
              'ui:errorMessages': {
                required:
                  'Please enter your email address, using this format: X@X.com',
                pattern:
                  'Please enter your email address again, using this format: X@X.com',
              },
            },
          },
          schema: {
            type: 'object',
            required: ['emailField'],
            properties: {
              emailField: {
                type: 'string',
                format: 'email',
              },
            },
          },
        },
        page4: {
          // Another page using a widget in the forms-system directory and it validates against -'s
          path: 'fourth-page',
          title: 'Fourth Page',
          uiSchema: {
            phoneNumber: {
              'ui:title': 'Please enter proper phone number.',
              'ui:widget': PhoneNumberWidget,
              'ui:errorMessages': {
                required: 'Please enter valid phone number without -"s',
                pattern: 'Please enter valid phone number without -"s',
              },
            },
          },
          schema: {
            type: 'object',
            required: ['phoneNumber'],
            properties: {
              phoneNumber: {
                type: 'number',
              },
            },
          },
        },
        page5: {
          // Validation is placed directly in the field definition which does not required field.validField
          path: 'fifth-page',
          title: 'Form Validation',
          uiSchema: {
            validField: {
              'ui:title': 'Valid Field',
              'ui:validations': [
                (errors, field) => {
                  if (field && field.startsWith('bad')) {
                    errors.addError(
                      "Sorry, you can't start this field with 'bad'",
                    );
                  }
                },
              ],
            },
          },
          schema: {
            type: 'object',
            properties: {
              validField: {
                type: 'string',
              },
            },
          },
        },
        page6: {
          // Validation is placed after the field are defined creating an object with email and confirmationEmail fields
          path: 'sixth-page',
          title: 'Sixth Page',
          uiSchema: {
            email: {
              'ui:title': 'Email',
              'ui:widget': 'email',
              'ui:errorMessages': {
                required:
                  'Please enter your email address, using this format: X@X.com',
                pattern:
                  'Please enter your email address again, using this format: X@X.com',
              },
            },
            confirmEmail: {
              'ui:title': 'Confirm email',
              'ui:widget': 'email',
              'ui:errorMessages': {
                required:
                  'Please enter your email address, using this format: X@X.com',
                pattern:
                  'Please enter your email address again, using this format: X@X.com',
              },
            },
            'ui:validations': [
              (errors, field) => {
                if (field.email !== field.confirmEmail) {
                  errors.confirmEmail.addError('Sorry, your emails must match');
                }
              },
            ],
          },
          schema: {
            type: 'object',
            required: ['email', 'confirmEmail'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              confirmEmail: {
                type: 'string',
                format: 'email',
              },
            },
          },
        },
        page7: {
          // Custom validation error message using regex pattern on input field
          // This regex match must be messed up because it does not work at all
          // even if you type in a number it does not pass the validation
          path: 'seventh-page',
          title: 'Seventh Page',
          uiSchema: {
            customValidField: {
              'ui:title': 'Enter a number but please only uses digits',
              'ui:errorMessages': {
                pattern: 'Sorry, this field requires all digits',
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              customValidField: {
                type: 'string',
                pattern: '^d+$',
              },
            },
          },
        },
        page8: {
          // Conditional Required Fields
          // Also in the documentation they are missing a , after the myField property object in Schema
          // Using the ui:required forces validation on myField to == test for myOtherField to work
          path: 'eighth-page',
          title: 'Eighth Page',
          uiSchema: {
            myField: {
              'ui:title': 'Word',
            },
            myOtherField: {
              'ui:title': 'Another word',
              'ui:required': formData => formData.myField === 'test',
            },
          },
          schema: {
            type: 'object',
            properties: {
              myField: {
                type: 'string',
              },
              myOtherField: {
                type: 'string',
              },
            },
          },
        },
        page9: {
          // Conditionally Displayed Fields
          // This is mostly copied and pasted but documentation is missing commas after ui:widget property in
          // myField section and a comma between the two fields in the schema section
          // Uses the yesNo ui:widget and conditionally shows the conditional field when you select a response
          // NOTE: Had to change myOtherField to myConditionalField in the schema section
          path: 'ninth-page',
          title: 'Ninth Page',
          uiSchema: {
            myField: {
              'ui:title': 'My field',
              'ui:widget': 'yesNo',
              'ui:options': {
                labels: {
                  Y: 'Yes, this is what I want',
                  N: 'No, I do not want this',
                },
                widgetProps: {
                  Y: { 'data-info': 'yes' },
                  N: { 'data-info': 'no' },
                },
                // Only added to the radio when it is selected
                // a11y requirement: aria-describedby ID's *must* exist on the page;
                // and we conditionally add content based on the selection
                selectedProps: {
                  Y: { 'aria-describedby': 'some_id' },
                  N: { 'aria-describedby': 'different_id' },
                },
              },
            },
            myConditionalField: {
              'ui:title': 'My conditional field',
              'ui:options': {
                expandUnder: 'myField',
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              myField: {
                type: 'boolean',
              },
              myConditionalField: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

export default formConfig;
