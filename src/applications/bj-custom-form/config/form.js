// import fullSchema from 'vets-json-schema/dist/21P-530-schema.json';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import CustomPage from '../containers/CustomPage';
import CustomPageReview from '../containers/CustomPageReview';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const formFields = {
  firstName: 'firstName',
  lastName: 'lastName',
  description: 'description',
};

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'bj-custom-form-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '21P-530',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your benefits application (21P-530) is in progress.',
    //   expired: 'Your saved benefits application (21P-530) has expired. If you want to apply for benefits, please start a new application.',
    //   saved: 'Your benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: 'bj-custom-form',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Personal Information',
      pages: {
        // page1: {
        //   path: 'first-name',
        //   title: 'Personal Information - Page 1',
        //   uiSchema: {
        //     [formFields.firstName]: {
        //       'ui:title': 'First Name',
        //     },
        //   },
        //   schema: {
        //     required: [formFields.firstName],
        //     type: 'object',
        //     properties: {
        //       [formFields.firstName]: {
        //         type: 'string',
        //       },
        //     },
        //   },
        // },
        mySchemalessPage: {
          path: 'my-schemaless-page',
          title: 'Bypassing the SchemaForm',
          CustomPage,
          CustomPageReview,
          schema: {
            type: 'object',
            properties: {
              [formFields.firstName]: {
                type: 'string',
              },
              [formFields.lastName]: {
                type: 'string',
              },
              [formFields.description]: {
                type: 'string',
              },
            },
          },
          uiSchema: {},
        },
      },
    },
  },
};

export default formConfig;
