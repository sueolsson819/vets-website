import { createSelector } from 'reselect';
import set from '../../utilities/data/set';
import get from '../../utilities/data/get';
import unset from '../../utilities/data/unset';
import { validateWhiteSpace } from '../validations';

import {
  countries,
  states,
  isValidUSZipCode,
  isValidCanPostalCode,
} from '../address';

function validatePostalCodes(errors, address) {
  let isValidPostalCode = true;

  // Checks if postal code is valid
  if (address.country === 'USA') {
    isValidPostalCode =
      isValidPostalCode && isValidUSZipCode(address.postalCode);
  }
  if (address.country === 'CAN') {
    isValidPostalCode =
      isValidPostalCode && isValidCanPostalCode(address.postalCode);
  }

  // Add error message for postal code if it is invalid
  if (address.postalCode && !isValidPostalCode) {
    errors.postalCode.addError('Please provide a valid postal code');
  }
}

export const stateRequiredCountries = new Set(['USA', 'CAN', 'MEX']);

/**
 * Require the state when the country field is required and the value is a
 * country which requires the state.
 */
export function requireStateWithCountry(
  errors,
  address,
  formData,
  currentSchema,
) {
  // Adds error message for state if it is blank and the country is one of the
  // following: USA, Canada, or Mexico
  if (
    stateRequiredCountries.has(address.country) &&
    address.state === undefined &&
    currentSchema.required.includes('country')
  ) {
    errors.state.addError('Please select a state or province');
  }
}

/**
 * Require the state when the country field is NOT required and the value is one
 * that requires the state BUT other address data is filled in.
 */
export function requireStateWithData(errors, address, formData, currentSchema) {
  const hasAddressInfo =
    stateRequiredCountries.has(address.country) &&
    !currentSchema.required.length &&
    // It's unclear why all three of these need to be undefined to require the
    // state as well; this merits further discovery.
    typeof address.street !== 'undefined' &&
    typeof address.city !== 'undefined' &&
    typeof address.postalCode !== 'undefined';

  if (hasAddressInfo && typeof address.state === 'undefined') {
    errors.state.addError(
      'Please enter a state or province, or remove other address information.',
    );
  }
}

export function validateStreet(errors, address) {
  validateWhiteSpace(errors.street, address.street);
}

export function validateCity(errors, address) {
  validateWhiteSpace(errors.city, address.city);
}

const countryValues = countries.map(object => object.value);
const countryNames = countries.map(object => object.label);
const militaryStates = states.USA.filter(
  state => state.value === 'AE' || state.value === 'AP' || state.value === 'AA',
).map(state => state.value);
const militaryLabels = states.USA.filter(
  state => state.value === 'AE' || state.value === 'AP' || state.value === 'AA',
).map(state => state.label);
const usaStates = states.USA.map(state => state.value);
const usaLabels = states.USA.map(state => state.label);
const canProvinces = states.CAN.map(state => state.value);
const canLabels = states.CAN.map(state => state.label);
const mexStates = states.MEX.map(state => state.value);
const mexLabels = states.MEX.map(state => state.label);

function isMilitaryCity(city = '') {
  const lowerCity = city.toLowerCase().trim();

  return lowerCity === 'apo' || lowerCity === 'fpo' || lowerCity === 'dpo';
}

const requiredFields = ['street', 'city', 'country', 'state', 'postalCode'];

/*
 * Create schema for addresses
 *
 * @param {object} schema - Schema for a full form, including address definition in definitions
 * @param {boolean} isRequired - If the address is required or not, defaults to false
 * @param {string} addressProperty - The name of the address definition to use from the common
 *   definitions in currentSchema
 */
export function schema(
  currentSchema,
  isRequired = false,
  addressProperty = 'address',
) {
  const addressSchema = currentSchema.definitions[addressProperty];
  return {
    type: 'object',
    required: isRequired ? requiredFields : [],
    properties: {
      ...addressSchema.properties,
      country: {
        default: 'USA',
        type: 'string',
        enum: countryValues,
        enumNames: countryNames,
      },
      state: {
        title: 'State',
        type: 'string',
        maxLength: 51,
      },
      postalCode: {
        type: 'string',
        maxLength: 10,
      },
    },
  };
}

/*
 * Create uiSchema for addresses
 *
 * @param {string} label - Block label for the address
 * @param {boolean} useStreet3 - Show a third line in the address
 * @param {function} isRequired - A function for conditionally setting if an address is required.
 *   Receives formData and an index (if in an array item)
 * @param {boolean} ignoreRequired - Ignore the required fields array, to avoid overwriting form specific
 *   customizations
 */
export function uiSchema(
  label = 'Address',
  useStreet3 = false,
  isRequired = null,
  ignoreRequired = false,
) {
  let fieldOrder = [
    'country',
    'street',
    'street2',
    'street3',
    'city',
    'state',
    'postalCode',
  ];
  if (!useStreet3) {
    fieldOrder = fieldOrder.filter(field => field !== 'street3');
  }

  const addressChangeSelector = createSelector(
    ({ formData, path }) => get(path.concat('country'), formData),
    ({ formData, path }) => get(path.concat('city'), formData),
    (...args) => get('addressSchema', ...args),
    (currentCountry, city, addressSchema) => {
      const schemaUpdate = {
        properties: addressSchema.properties,
        required: addressSchema.required,
      };
      const country =
        currentCountry || addressSchema.properties.country.default;
      const required = addressSchema.required.length > 0;

      let stateList;
      let labelList;
      if (country === 'USA') {
        stateList = usaStates;
        labelList = usaLabels;
      } else if (country === 'CAN') {
        stateList = canProvinces;
        labelList = canLabels;
      } else if (country === 'MEX') {
        stateList = mexStates;
        labelList = mexLabels;
      }

      if (stateList) {
        // We have a list and it’s different, so we need to make schema updates
        if (addressSchema.properties.state.enum !== stateList) {
          const withEnum = set(
            'state.enum',
            stateList,
            schemaUpdate.properties,
          );
          schemaUpdate.properties = set('state.enumNames', labelList, withEnum);

          // all the countries with state lists require the state field, so add that if necessary
          if (
            !ignoreRequired &&
            required &&
            !addressSchema.required.some(field => field === 'state')
          ) {
            schemaUpdate.required = addressSchema.required.concat('state');
          }
        }
        // We don’t have a state list for the current country, but there’s an enum in the schema
        // so we need to update it
      } else if (addressSchema.properties.state.enum) {
        const withoutEnum = unset('state.enum', schemaUpdate.properties);
        schemaUpdate.properties = unset('state.enumNames', withoutEnum);
        if (!ignoreRequired && required) {
          schemaUpdate.required = addressSchema.required.filter(
            field => field !== 'state',
          );
        }
      }

      // Canada has a different title than others, so set that when necessary
      if (
        country === 'CAN' &&
        addressSchema.properties.state.title !== 'Province'
      ) {
        schemaUpdate.properties = set(
          'state.title',
          'Province',
          schemaUpdate.properties,
        );
      } else if (
        country !== 'CAN' &&
        addressSchema.properties.state.title !== 'State'
      ) {
        schemaUpdate.properties = set(
          'state.title',
          'State',
          schemaUpdate.properties,
        );
      }

      // We constrain the state list when someone picks a city that’s a military base
      if (
        country === 'USA' &&
        isMilitaryCity(city) &&
        schemaUpdate.properties.state.enum !== militaryStates
      ) {
        const withEnum = set(
          'state.enum',
          militaryStates,
          schemaUpdate.properties,
        );
        schemaUpdate.properties = set(
          'state.enumNames',
          militaryLabels,
          withEnum,
        );
      }

      return schemaUpdate;
    },
  );

  return {
    'ui:title': label,
    'ui:validations': [
      requireStateWithCountry,
      requireStateWithData,
      validateStreet,
      validateCity,
      validatePostalCodes,
    ],
    'ui:options': {
      updateSchema: (formData, addressSchema, addressUiSchema, index, path) => {
        let currentSchema = addressSchema;
        if (isRequired) {
          const required = isRequired(formData, index);
          if (required && currentSchema.required.length === 0) {
            currentSchema = set('required', requiredFields, currentSchema);
          } else if (!required && currentSchema.required.length > 0) {
            currentSchema = set('required', [], currentSchema);
          }
        }
        return addressChangeSelector({
          formData,
          addressSchema: currentSchema,
          path,
        });
      },
    },
    'ui:order': fieldOrder,
    country: {
      'ui:title': 'Country',
      'ui:autocomplete': 'country',
    },
    street: {
      'ui:title': 'Street',
      'ui:autocomplete': 'address-line1',
      'ui:errorMessages': {
        required: 'Please enter a street address',
      },
    },
    street2: {
      'ui:title': 'Street address line 2',
      'ui:autocomplete': 'address-line2',
    },
    street3: {
      'ui:title': 'Street address line 3',
      'ui:autocomplete': 'address-line3',
    },
    city: {
      'ui:title': 'City',
      'ui:autocomplete': 'address-level2',
      'ui:errorMessages': {
        required: 'Please enter a city',
      },
    },
    state: {
      'ui:autocomplete': 'address-level1',
      'ui:errorMessages': {
        required: 'Please enter a state',
      },
    },
    postalCode: {
      'ui:title': 'Postal code',
      'ui:autocomplete': 'postal-code',
      'ui:options': {
        widgetClassNames: 'usa-input-medium',
      },
      'ui:errorMessages': {
        required: 'Please enter a postal code',
      },
    },
  };
}
