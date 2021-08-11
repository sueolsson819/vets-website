export const FETCH_STATUS = {
  loading: 'loading',
  notStarted: 'notStarted',
  succeeded: 'succeeded',
  failed: 'failed',
};

export const APPOINTMENT_TYPES = {
  vaAppointment: 'vaAppointment',
  ccAppointment: 'ccAppointment',
  request: 'request',
  ccRequest: 'ccRequest',
};

export const APPOINTMENT_STATUS = {
  arrived: 'arrived',
  booked: 'booked',
  cancelled: 'cancelled',
  fulfilled: 'fulfilled',
  noshow: 'noshow',
  pending: 'pending',
  proposed: 'proposed',
};

export const VIDEO_TYPES = {
  gfe: 'MOBILE_GFE',
  clinic: 'CLINIC_BASED',
  adhoc: 'ADHOC',
  mobile: 'MOBILE_ANY',
  storeForward: 'STORE_FORWARD',
};

export const PURPOSE_TEXT = [
  {
    id: 'routine-follow-up',
    short: 'Follow-up/Routine',
    label: 'This is a routine or follow-up visit.',
    serviceName: 'Routine Follow-up',
  },
  {
    id: 'new-issue',
    short: 'New issue',
    label: 'I have a new medical issue.',
    serviceName: 'New Issue',
  },
  {
    id: 'medication-concern',
    short: 'Medication concern',
    label: 'I have a concern or question about my medication.',
    serviceName: 'Medication Concern',
  },
  {
    id: 'other',
    short: 'My reason isn’t listed',
    label: 'My reason isn’t listed here.',
    serviceName: 'Other',
  },
];

export const PODIATRY_ID = 'tbd-podiatry';
export const COVID_VACCINE_ID = 'covid';

/**
 * @typedef TypeOfCare
 *
 * @property {string} id Numeric id of the type of care
 * @property {string} name Name of the type of care
 * @property {string} label Longer label name for the type of care, used when choosing type
 * @property {string|Array<string>} ccId Id(s) of the associated community care types of
 *   care list in VAR resources
 * @property {string} cceType Id of the associated community care serviceType from the
 *   Lighthouse eligibility api
 * @property {Array<string>} specialities PPMS specialty codes associated with this type of care
 */

export const PRIMARY_CARE = '323';
export const MENTAL_HEALTH = '502';

export const TYPES_OF_CARE = [
  {
    id: PRIMARY_CARE,
    idV2: 'primaryCare',
    name: 'Primary care',
    group: 'primary',
    ccId: 'CCPRMYRTNE',
    cceType: 'PrimaryCare',
    specialties: ['207QA0505X', '363LP2300X', '363LA2200X', '261QP2300X'],
  },
  {
    id: '160',
    idV2: 'clinicalPharmacyPrimaryCare',
    name: 'Pharmacy',
    group: 'primary',
  },
  {
    id: MENTAL_HEALTH,
    idV2: 'outpatientMentalHealth',
    name: 'Mental health',
    group: 'mentalHealth',
  },
  {
    id: '125',
    idV2: 'socialWork',
    name: 'Social work',
    group: 'mentalHealth',
  },
  {
    id: '211',
    idV2: 'amputation',
    name: 'Amputation care',
    group: 'specialty',
  },
  {
    id: '203',
    idV2: 'audiology',
    name: 'Audiology and speech',
    label: 'Audiology and speech (including hearing aid support)',
    group: 'specialty',
    ccId: ['CCAUDHEAR', 'CCAUDRTNE'],
    cceType: 'Audiology',
  },
  {
    id: '372',
    idV2: 'moveProgram',
    name: 'MOVE! weight management program',
    group: 'specialty',
  },
  {
    id: '123',
    idV2: 'foodAndNutrition',
    name: 'Nutrition and food',
    group: 'specialty',
    ccId: 'CCNUTRN',
    cceType: 'Nutrition',
    specialties: ['133V00000X', '133VN1201X', '133N00000X', '133NN1002X'],
  },
  {
    id: PODIATRY_ID,
    idV2: '411',
    name: 'Podiatry',
    label: 'Podiatry (only available online for Community Care appointments)',
    ccId: 'CCPOD',
    group: 'specialty',
    cceType: 'Podiatry',
    specialties: [
      '213E00000X',
      '213EG0000X',
      '213EP1101X',
      '213ES0131X',
      '213ES0103X',
    ],
  },
  {
    id: 'SLEEP',
    name: 'Sleep medicine',
    group: 'specialty',
  },
  {
    id: 'EYE',
    name: 'Eye care',
    group: 'specialty',
  },
  {
    id: COVID_VACCINE_ID,
    name: 'COVID-19 vaccine',
  },
];

export const TYPES_OF_SLEEP_CARE = [
  {
    id: '349',
    idV2: 'cpap',
    name: 'Continuous Positive Airway Pressure (CPAP)',
  },
  {
    id: '143',
    idV2: 'homeSleepTesting',
    name: 'Sleep medicine and home sleep testing',
  },
];

export const TYPES_OF_EYE_CARE = [
  {
    id: '408',
    idV2: 'optometry',
    name: 'Optometry',
    ccId: 'CCOPT',
    cceType: 'Optometry',
    specialties: ['152W00000X', '152WC0802X'],
  },
  {
    id: '407',
    idV2: 'ophthalmology',
    name: 'Ophthalmology',
  },
];

export const AUDIOLOGY_TYPES_OF_CARE = [
  {
    ccId: 'CCAUDRTNE',
    name: 'Routine hearing exam',
    specialties: ['231H00000X', '237600000X', '261QH0700X'],
  },
  {
    ccId: 'CCAUDHEAR',
    name: 'Hearing aid support',
    specialties: ['231H00000X', '237600000X'],
  },
];

export const FACILITY_TYPES = {
  VAMC: 'vamc',
  COMMUNITY_CARE: 'communityCare',
};

export const FACILITY_SORT_METHODS = {
  distanceFromResidential: 'distanceFromResidentialAddress',
  distanceFromCurrentLocation: 'distanceFromCurrentLocation',
  alphabetical: 'alphabetical',
};

export const LANGUAGES = [
  {
    id: 'english',
    text: 'English',
    value: 'English',
  },
  {
    id: 'chinese',
    text: 'Chinese',
    value: 'Chinese',
  },
  {
    id: 'french',
    text: 'French',
    value: 'French',
  },
  {
    id: 'german',
    text: 'German',
    value: 'German',
  },
  {
    id: 'italian',
    text: 'Italian',
    value: 'Italian',
  },
  {
    id: 'korean',
    text: 'Korean',
    value: 'Korean',
  },
  {
    id: 'portuguese',
    text: 'Portuguese',
    value: 'Portuguese',
  },
  {
    id: 'russian',
    text: 'Russian',
    value: 'Russian',
  },
  {
    id: 'spanish',
    text: 'Spanish',
    value: 'Spanish',
  },
  {
    id: 'tagalog',
    text: 'Tagalog (Filipino)',
    value: 'Tagalog (Filipino)',
  },
  {
    id: 'vietnamese',
    text: 'Vietnamese',
    value: 'Vietnamese',
  },
  {
    id: 'other',
    text: 'Other',
    value: 'Other',
  },
];

export const FLOW_TYPES = {
  DIRECT: 'direct',
  REQUEST: 'request',
};

export const TYPE_OF_VISIT = [
  {
    id: 'clinic',
    name: 'Office visit',
    serviceName: 'Office Visit',
  },
  {
    id: 'phone',
    name: 'Phone call',
    serviceName: 'Phone Call',
  },
  {
    id: 'telehealth',
    name: 'Telehealth (through VA Video Connect)',
    serviceName: 'Video Conference',
  },
];

// todo: not used, delete?
export const DISTANCES = [
  {
    id: '25',
    name: 'Up to 25 miles',
  },
  {
    id: '50',
    name: 'Up to 50 miles',
  },
  {
    id: '50+',
    name: 'Further than 50 miles',
  },
];

export const EXPRESS_CARE = 'CR1';

export const GA_PREFIX = 'vaos';

export const VHA_FHIR_ID = 'urn:oid:2.16.840.1.113883.6.233';

export const FREE_BUSY_TYPES = {
  busy: 'busy',
  free: 'free',
  busyUnavailable: 'busy-unavailable',
  busyTentative: 'busy-tentative',
};

export const UNABLE_TO_REACH_VETERAN_DETCODE = 'DETCODE23';

export const EXPRESS_CARE_ERROR_REASON = {
  error: 'error',
  noActiveFacility: 'noActiveFacility',
};

export const DEFAULT_WEEK_DAYS = [
  {
    name: 'Monday',
    abbr: 'Mon',
  },
  {
    name: 'Tuesday',
    abbr: 'Tue',
  },
  {
    name: 'Wednesday',
    abbr: 'Wed',
  },
  {
    name: 'Thursday',
    abbr: 'Thu',
  },
  {
    name: 'Friday',
    abbr: 'Fri',
  },
];

export const ELIGIBILITY_REASONS = {
  notEnabled: 'notEnabled',
  notSupported: 'notSupported',
  noRecentVisit: 'noRecentVisit',
  overRequestLimit: 'overRequestLimit',
  noClinics: 'noClinics',
  noMatchingClinics: 'noMatchingClinics',
  error: 'error',
};
