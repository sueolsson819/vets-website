// import fullSchema from 'vets-json-schema/dist/BJ-230-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

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
                // Only added to the radio when it is selected
                // a11y requirement: aria-describedby ID's *must* exist on the page;
                // and we conditionally add content based on the selection
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
      },
    },
  },
};

export default formConfig;
