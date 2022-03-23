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
          path: 'chapter-1-page-1',
          title: 'Chapter 1 First Page',
          uiSchema: {
            passPhrase: {
              'ui:title': 'Pass Phrase',
            },
          },
          schema: {
            type: 'object',
            properties: {
              passPhrase: { type: 'string' },
            },
          },
        },
        page2: {
          path: 'chapter-1-page-2',
          title: 'Chapter 1 Second Page',
          depends: formData => {
            return formData.passPhrase === 'open sesame';
          },
          uiSchema: {
            coolField: {
              'ui:title': 'Cool Conditional Page',
            },
          },
          schema: {
            type: 'object',
            properties: {
              coolField: { type: 'string' },
            },
          },
        },
      },
    },
    // chapter2: {
    //   title: 'Chapter 2',
    //   pages: {
    //     page1: {
    //       path: 'chapter-2-first-page',
    //       title: 'Chapter 2 First Page',
    //       uiSchema: {
    //         awesomeField: {
    //           'ui:title': 'Awesome Field',
    //         },
    //       },
    //       schema: {
    //         type: 'object',
    //         properties: {
    //           awesomeField: { type: 'string' },
    //         },
    //       },
    //     },
    //   },
    // },
  },
};

export default formConfig;
