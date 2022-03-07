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
            fieldOnAnotherPage: {
              'ui:title': 'Field on Another Page',
            },
          },
          schema: {
            type: 'object',
            properties: {
              fieldOnAnotherPage: {
                type: 'string',
              },
            },
          },
        },
        page2: {
          path: 'second-page',
          title: 'Second Page',
          depends: form => form.fieldOnAnotherPage !== 'test',
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
          },
          schema: {
            type: 'object',
            properties: {
              myField: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
};

export default formConfig;
