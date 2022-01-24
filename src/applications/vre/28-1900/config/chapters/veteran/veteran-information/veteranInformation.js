import fullSchema from 'vets-json-schema/dist/28-1900-schema.json';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';

import FieldsetTitle from 'applications/vre/28-1900/components/i18n/FieldsetTitle';
import TextField from 'applications/vre/28-1900/components/i18n/TextField';
import FieldTemplate from 'applications/vre/28-1900/components/i18n/FieldTemplate';

const { veteranInformation } = fullSchema.properties;

export const schema = {
  type: 'object',
  properties: {
    veteranInformation,
  },
};

export const uiSchema = {
  'ui:FieldTemplate': FieldTemplate,
  'ui:ObjectFieldTemplate': FieldTemplate,
  veteranInformation: {
    'ui:FieldTemplate': FieldTemplate,
    'ui:ObjectFieldTemplate': FieldTemplate,
    'ui:title': FieldsetTitle,
    fullName: {
      'ui:FieldTemplate': FieldTemplate,
      'ui:ObjectFieldTemplate': FieldTemplate,
      first: {
        'ui:FieldTemplate': FieldTemplate,
        'ui:required': () => true,
        'ui:field': TextField,
      },
      middle: {
        'ui:title': 'Your middle name',
        'ui:options': {
          hideEmptyValueInReview: true,
        },
      },
      last: {
        'ui:title': 'Your last name',
        'ui:required': () => true,
      },
      suffix: {
        'ui:title': 'Suffix',
        'ui:options': {
          widgetClassNames: 'form-select-medium',
          hideEmptyValueInReview: true,
        },
      },
    },
    dob: {
      ...currentOrPastDateUI('Date of birth'),
      'ui:required': () => true,
    },
  },
};
