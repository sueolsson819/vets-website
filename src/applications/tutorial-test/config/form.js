import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'tutorial-test-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: 'XX-230',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your tutorial test benefits application (XX-230) is in progress.',
    //   expired: 'Your saved tutorial test benefits application (XX-230) has expired. If you want to apply for tutorial test benefits, please start a new application.',
    //   saved: 'Your tutorial test benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for tutorial test benefits.',
    noAuth:
      'Please sign in again to continue your application for tutorial test benefits.',
  },
  title: 'tutorial-test',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Chapter 1',
      pages: {
        page1: {
          path: 'first-page',
          title: 'First Page',
          uiSchema: {
            email: {
              'ui:title': 'Email',
            },
            confirmEmail: {
              'ui:title': 'Confirm email',
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
            properties: {
              email: {
                type: 'string',
              },
              confirmEmail: {
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
