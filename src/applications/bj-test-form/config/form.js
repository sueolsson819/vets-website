// import fullSchema from 'vets-json-schema/dist/BJ-230-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import CurrencyWidget from 'platform/forms-system/src/js/widgets/CurrencyWidget';
import PhoneNumberWidget from 'platform/forms-system/src/js/widgets/PhoneNumberWidget';

// import CustomPage from '../containers/CustomPage'; // React component
// import CustomPageReview from '../containers/CustomPageReview'; // React component

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
      },
    },
  },
};

export default formConfig;
