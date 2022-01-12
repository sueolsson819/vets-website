// import fullSchema from 'vets-json-schema/dist/21T-MC-schema.json';
import React from 'react';
import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const AgeWidget = () => {
  return (
    <>
      <va-text-input
        onChange={v => {
          return v;
        }}
        label="Age field"
        name="my-age"
      />
    </>

    // <va-alert
    //   close-btn-aria-label="Close notification"
    //   status="info"
    //   visible
    //   >
    //   <h3 slot="headline">
    //       Alert headline
    //   </h3>
    //   <div>
    //       This is an alert
    //   </div>
    // </va-alert>
  );
};

const formFields = {
  ageField: 'ageField',
};

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api',
  trackingPrefix: 'mc-test-app-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '21T-MC',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your benefits application (21T-MC) is in progress.',
    //   expired: 'Your saved benefits application (21T-MC) has expired. If you want to apply for benefits, please start a new application.',
    //   saved: 'Your benefits application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: '21T-MC-TEST-APP',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Personal Information',
      pages: {
        page1: {
          path: 'first-name',
          title: 'Personal Information - Page 1',
          uiSchema: {
            [formFields.ageField]: {
              'ui:widget': AgeWidget,
            },
          },
          schema: {
            required: [formFields.ageField],
            type: 'object',
            properties: {
              [formFields.ageField]: {
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
