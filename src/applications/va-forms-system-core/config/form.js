// import fullSchema from 'vets-json-schema/dist/&#39;22-0993&#39;-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import CustomPage from '../containers/CustomPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const formFields = {
  firstName: 'firstName',
};

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'va-forms-system-core-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '&#39;22-0993&#39;',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your benefits application (&#39;22-0993&#39;) is in progress.',
    //   expired: 'Your saved benefits application (&#39;22-0993&#39;) has expired. If you want to apply for benefits, please start a new application.',
    //   saved: 'Your benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: 'va-forms-system-core',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Personal Information',
      pages: {
        page1: {
          path: 'first-name',
          title: 'Personal Information - Page 1',
          CustomPage,
          uiSchema: {},
          schema: {
            required: [formFields.firstName],
            type: 'object',
            properties: {
              [formFields.firstName]: {
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
