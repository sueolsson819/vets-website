import commonDefinitions from 'vets-json-schema/dist/definitions.json';
import GetFormHelp from '../components/GetFormHelp';
import preSubmitInfo from 'platform/forms/preSubmitInfo';
import FormFooter from 'platform/forms/components/FormFooter';
import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import phoneUI from 'platform/forms-system/src/js/definitions/phone';
import { VA_FORM_IDS } from 'platform/forms/constants';
import environment from 'platform/utilities/environment';

import manifest from '../manifest.json';
import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import { prefillTransformer } from '../helpers';
import { isValidPhone } from '../utils/validation';
import { createSubmissionForm } from '../utils/form-submit-transform';

const { fullName, date, usaPhone } = commonDefinitions;

// Define all the fields in the form to aid reuse
const formFields = {
  userFullName: 'userFullName',
  viewPhoneNumbers: 'view:phoneNumbers',
  phoneNumber: 'phoneNumber',
  mobilePhoneNumber: 'mobilePhoneNumber',
};

// Define all the form pages to help ensure uniqueness across all form chapters
const formPages = {
  applicantInformation: 'applicantInformation',
  contactInformation: {
    contactInformation: 'contactInformation',
    preferredContactMethod: 'preferredContactMethod',
  },
};

function phoneSchema() {
  return {
    type: 'object',
    properties: {
      phone: usaPhone,
    },
  };
}

function transform(metaData, form) {
  const submission = createSubmissionForm(form.data);
  return JSON.stringify(submission);
}

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: `${environment.API_URL}/meb_api/v0/submit_claim`,
  transformForSubmit: transform,
  trackingPrefix: 'my-education-benefits-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: VA_FORM_IDS.FORM_22_1990EZ,
  version: 0,
  prefillEnabled: true,
  prefillTransformer,
  title: 'Apply for VA education benefits',
  subTitle: 'Equal to VA Form 22-1990 (Application for VA Education Benefits)',
  defaultDefinitions: {
    fullName,
    date,
    usaPhone,
  },
  footerContent: FormFooter,
  getHelp: GetFormHelp,
  preSubmitInfo,
  chapters: {
    applicantInformationChapter: {
      title: 'Your information',
      pages: {
        [formPages.applicantInformation]: {
          title: 'Your information',
          path: 'applicant-information/personal-information',
          subTitle: 'Your information',
          uiSchema: {
            'view:userFullNameFooBar': {
              [formFields.userFullName]: fullNameUI,
            },
          },
          schema: {
            type: 'object',
            properties: {
              'view:userFullNameFooBar': {
                required: [formFields.userFullName],
                type: 'object',
                properties: {
                  [formFields.userFullName]: fullName,
                },
              },
            },
          },
        },
      },
    },
    contactInformationChapter: {
      title: 'Contact information',
      pages: {
        [formPages.contactInformation.contactInformation]: {
          title: 'Phone numbers and email address',
          path: 'contact-information/email-phone',
          uiSchema: {
            [formFields.viewPhoneNumbers]: {
              [formFields.mobilePhoneNumber]: {
                phone: phoneUI('Mobile Phone Number'),
              },
              [formFields.phoneNumber]: {
                phone: phoneUI('Home Phone Number'),
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              [formFields.viewPhoneNumbers]: {
                type: 'object',
                properties: {
                  [formFields.mobilePhoneNumber]: phoneSchema(),
                  [formFields.phoneNumber]: phoneSchema(),
                },
              },
            },
          },
        },
        [formPages.contactInformation.preferredContactMethod]: {
          title: 'Contact preferences',
          path: 'contact-information/contact-preferences',
          uiSchema: {
            'view:noMobilePhoneAlert': {
              'ui:options': {
                hideIf: formData =>
                  isValidPhone(
                    formData[formFields.viewPhoneNumbers][
                      formFields.mobilePhoneNumber
                    ].phone,
                  ) /* ||
                  formData[formFields.viewPhoneNumbers][
                    formFields.mobilePhoneNumber
                  ].isInternational */,
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              'view:noMobilePhoneAlert': {
                type: 'object',
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export default formConfig;
