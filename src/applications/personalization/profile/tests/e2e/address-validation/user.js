import { CSP_IDS } from 'platform/user/authentication/constants';

const userObject = {
  data: {
    id: '',
    type: 'users_scaffolds',
    attributes: {
      services: [
        'facilities',
        'hca',
        'edu-benefits',
        'form-save-in-progress',
        'form-prefill',
        'mhv-accounts',
        'evss-claims',
        'form526',
        'user-profile',
        'appeals-status',
        'id-card',
        'identity-proofed',
        'vet360',
        'evss_common_client',
        'claim_increase',
      ],
      account: {
        accountUuid: 'c049d895-ecdf-40a4-ac0f-7947a06ea0c2',
      },
      profile: {
        email: 'vets.gov.user+36@gmail.com',
        firstName: 'WESLEY',
        middleName: 'WATSON',
        lastName: 'FORD',
        birthDate: '1986-05-06',
        gender: 'M',
        zip: '94122',
        lastSignedIn: '2020-11-04T01:20:56.148Z',
        loa: {
          current: 3,
          highest: 3,
        },
        multifactor: true,
        verified: true,
        signIn: {
          serviceName: CSP_IDS.ID_ME,
          accountType: 'N/A',
        },
        authnContext: 'http://idmanagement.gov/ns/assurance/loa/3',
      },
      vaProfile: {
        status: 'OK',
        birthDate: '19860506',
        familyName: 'Ford',
        gender: 'M',
        givenNames: ['Wesley', 'Watson'],
        isCernerPatient: false,
        facilities: [
          {
            facilityId: '983',
            isCerner: false,
          },
        ],
        vaPatient: true,
        mhvAccountState: 'NONE',
      },
      veteranStatus: {
        status: 'OK',
        isVeteran: true,
        servedInMilitary: true,
      },
      vet360ContactInformation: {
        email: null,
        residentialAddress: {
          addressLine1: '36320 Coronado Dr',
          addressLine2: null,
          addressLine3: null,
          addressPou: 'RESIDENCE/CHOICE',
          addressType: 'DOMESTIC',
          city: 'Fremont',
          countryName: 'United States',
          countryCodeIso2: 'US',
          countryCodeIso3: 'USA',
          countryCodeFips: null,
          countyCode: null,
          countyName: null,
          createdAt: '2020-08-26T16:32:49.000Z',
          effectiveEndDate: null,
          effectiveStartDate: '2020-09-04T15:42:09.000Z',
          geocodeDate: '2020-09-04T15:42:10.000Z',
          geocodePrecision: 31,
          id: 192573,
          internationalPostalCode: null,
          latitude: 37.5583,
          longitude: -122.0223,
          province: null,
          sourceDate: '2020-09-04T15:42:09.000Z',
          sourceSystemUser: null,
          stateCode: 'CA',
          transactionId: '058b155e-f752-48a7-a75b-51317a893e6a',
          updatedAt: '2020-09-04T15:42:10.000Z',
          validationKey: null,
          vet360Id: '1273780',
          zipCode: '94536',
          zipCodeSuffix: null,
        },
        mailingAddress: {
          addressLine1: '36320 Coronado Dr',
          addressLine2: null,
          addressLine3: null,
          addressPou: 'CORRESPONDENCE',
          addressType: 'DOMESTIC',
          city: 'Fremont',
          countryName: 'United States',
          countryCodeIso2: 'US',
          countryCodeIso3: 'USA',
          countryCodeFips: null,
          countyCode: '06001',
          countyName: 'Alameda County',
          createdAt: '2020-09-23T16:50:37.000Z',
          effectiveEndDate: null,
          effectiveStartDate: '2020-11-04T01:21:52.000Z',
          geocodeDate: '2020-11-04T01:21:53.000Z',
          geocodePrecision: 31,
          id: 198543,
          internationalPostalCode: null,
          latitude: 37.5583,
          longitude: -122.0223,
          province: null,
          sourceDate: '2020-11-04T01:21:52.000Z',
          sourceSystemUser: null,
          stateCode: 'CA',
          transactionId: 'bfedd909-9dc4-4b27-abc2-a6cccaece35d',
          updatedAt: '2020-11-04T01:21:53.000Z',
          validationKey: null,
          vet360Id: '1273780',
          zipCode: '94536',
          zipCodeSuffix: '5537',
        },
      },
      session: {
        ssoe: true,
        transactionid: 'Ena9OyFrVDW4wDGejPDVfMVABTBw0zmYaOTwt9fof44=',
      },
    },
  },
  meta: {
    errors: null,
  },
};

export const createUserResponse = type => {
  if (type === 'valid-address') {
    return userObject;
  }

  if (type === 'low-confidence') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '36320 Coronado Dr',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'Fremont',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: '06001',
      countyName: 'Alameda County',
      createdAt: '2020-10-30T19:36:41.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-19T18:26:54.000Z',
      geocodeDate: '2020-11-19T18:26:54.000Z',
      geocodePrecision: 31,
      id: 5099836,
      internationalPostalCode: null,
      latitude: 37.5583,
      longitude: -122.0223,
      province: null,
      sourceDate: '2020-11-19T18:26:54.000Z',
      sourceSystemUser: null,
      stateCode: 'CA',
      transactionId: '72a3125c-d1c2-43d0-991f-fcf3c771d8b0',
      updatedAt: '2020-11-19T18:26:54.000Z',
      validationKey: null,
      vet360Id: '2942585',
      zipCode: '94536',
      zipCodeSuffix: '5537',
    };
  }

  if (type === 'military') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: 'PSC 808 Box 37',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'OVERSEAS MILITARY',
      city: 'FPO',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: '36061',
      countyName: 'New York County',
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-10T19:13:12.000Z',
      geocodeDate: '2020-11-10T19:13:13.000Z',
      geocodePrecision: 0,
      id: 198543,
      internationalPostalCode: null,
      latitude: 40.7142,
      longitude: -74.0059,
      province: null,
      sourceDate: '2020-11-10T19:13:12.000Z',
      sourceSystemUser: null,
      stateCode: 'AE',
      transactionId: '8b65ee20-e9ad-42e6-b521-6ca34b9ca4cc',
      updatedAt: '2020-11-10T19:13:13.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '09618',
      zipCodeSuffix: '0001',
    };
  }

  if (type === 'international') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: 'Dam 1',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'INTERNATIONAL',
      city: 'Amsterdam',
      countryName: 'Netherlands',
      countryCodeIso2: 'NL',
      countryCodeIso3: 'NLD',
      countryCodeFips: null,
      countyCode: null,
      countyName: null,
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-16T21:02:21.000Z',
      geocodeDate: '2020-11-16T21:02:22.000Z',
      geocodePrecision: 11,
      id: 198543,
      internationalPostalCode: '1012 JS',
      latitude: 52.3732,
      longitude: 4.8907,
      province: 'Noord-Holland',
      sourceDate: '2020-11-16T21:02:21.000Z',
      sourceSystemUser: null,
      stateCode: null,
      transactionId: '841c1246-dded-4d6a-a6d7-99634b03aaa9',
      updatedAt: '2020-11-16T21:02:22.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: null,
      zipCodeSuffix: null,
    };
  }

  if (type === 'confirm-address') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '36310 Coronado Dr',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'Fremont',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: null,
      countyName: null,
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-16T14:42:37.000Z',
      geocodeDate: '2020-11-16T14:42:38.000Z',
      geocodePrecision: 31,
      id: 198543,
      internationalPostalCode: null,
      latitude: 37.5583,
      longitude: -122.0224,
      province: null,
      sourceDate: '2020-11-16T14:42:37.000Z',
      sourceSystemUser: null,
      stateCode: 'CA',
      transactionId: '1e9ddefa-62a0-4c6f-be00-c1b30d2e1e98',
      updatedAt: '2020-11-16T14:42:38.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '94536',
      zipCodeSuffix: null,
    };
  }

  if (type === 'missing-unit') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '225 irving st',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'San Francisco',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: null,
      countyName: null,
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-04T18:45:43.000Z',
      geocodeDate: '2020-11-04T18:45:44.000Z',
      geocodePrecision: 31,
      id: 198543,
      internationalPostalCode: null,
      latitude: 37.7642,
      longitude: -122.4602,
      province: null,
      sourceDate: '2020-11-04T18:45:43.000Z',
      sourceSystemUser: null,
      stateCode: 'CA',
      transactionId: '22d18b36-c9d7-49ea-bd81-7256e5161fae',
      updatedAt: '2020-11-04T18:45:44.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '94122',
      zipCodeSuffix: null,
    };
  }

  if (type === 'bad-unit') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '225 irving st',
      addressLine2: 'Unit A',
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'San Francisco',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: null,
      countyName: null,
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-04T18:45:43.000Z',
      geocodeDate: '2020-11-04T18:45:44.000Z',
      geocodePrecision: 31,
      id: 198543,
      internationalPostalCode: null,
      latitude: 37.7642,
      longitude: -122.4602,
      province: null,
      sourceDate: '2020-11-04T18:45:43.000Z',
      sourceSystemUser: null,
      stateCode: 'CA',
      transactionId: '22d18b36-c9d7-49ea-bd81-7256e5161fae',
      updatedAt: '2020-11-04T18:45:44.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '94122',
      zipCodeSuffix: null,
    };
  }

  if (type === 'one-suggestion') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '400 NW 65th St',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'Seattle',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: '53033',
      countyName: 'King County',
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-09T17:26:08.000Z',
      geocodeDate: '2020-11-09T17:26:08.000Z',
      geocodePrecision: 31,
      id: 198543,
      internationalPostalCode: null,
      latitude: 47.6761,
      longitude: -122.362,
      province: null,
      sourceDate: '2020-11-09T17:26:08.000Z',
      sourceSystemUser: null,
      stateCode: 'WA',
      transactionId: 'cf853077-edae-4556-9e62-d0ced9c45cc7',
      updatedAt: '2020-11-09T17:26:09.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '98117',
      zipCodeSuffix: '5026',
    };
  }

  if (type === 'two-suggestions') {
    userObject.data.attributes.vet360ContactInformation.mailingAddress = {
      addressLine1: '575 20th St',
      addressLine2: null,
      addressLine3: null,
      addressPou: 'CORRESPONDENCE',
      addressType: 'DOMESTIC',
      city: 'San Francisco',
      countryName: 'United States',
      countryCodeIso2: 'US',
      countryCodeIso3: 'USA',
      countryCodeFips: null,
      countyCode: '06075',
      countyName: 'San Francisco County',
      createdAt: '2020-09-23T16:50:37.000Z',
      effectiveEndDate: null,
      effectiveStartDate: '2020-11-09T17:46:59.000Z',
      geocodeDate: '2020-11-09T17:46:59.000Z',
      geocodePrecision: 31,
      id: 198543,
      internationalPostalCode: null,
      latitude: 37.7604,
      longitude: -122.3878,
      province: null,
      sourceDate: '2020-11-09T17:46:59.000Z',
      sourceSystemUser: null,
      stateCode: 'CA',
      transactionId: 'bfedd909-9dc4-4b27-abc2-a6cccaece35d',
      updatedAt: '2020-11-09T17:46:59.000Z',
      validationKey: null,
      vet360Id: '1273780',
      zipCode: '94107',
      zipCodeSuffix: '4345',
    };
  }
  return userObject;
};
