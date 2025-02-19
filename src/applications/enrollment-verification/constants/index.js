import manifest from '../manifest.json';

export const BASE_URL = `${manifest.rootUrl}/`;
export const REVIEW_ENROLLMENTS_URL_SEGMENT =
  'post-911-gi-bill-enrollment-verifications';
export const REVIEW_ENROLLMENTS_URL = `${BASE_URL}${REVIEW_ENROLLMENTS_URL_SEGMENT}/`;
export const REVIEW_ENROLLMENTS_RELATIVE_URL = `/${REVIEW_ENROLLMENTS_URL_SEGMENT}/`;

export const VERIFY_ENROLLMENTS_URL_SEGMENT = 'verify-all-enrollments';
export const VERIFY_ENROLLMENTS_URL = `${REVIEW_ENROLLMENTS_URL}${VERIFY_ENROLLMENTS_URL_SEGMENT}/`;
export const VERIFY_ENROLLMENTS_RELATIVE_URL = `/${REVIEW_ENROLLMENTS_URL_SEGMENT}/${VERIFY_ENROLLMENTS_URL_SEGMENT}/`;

export const STATUS = {
  ALL_VERIFIED: 'STATUS_ALL_VERIFIED',
  MISSING_VERIFICATION: 'STATUS_MISSING_VERIFICATION',
  PAYMENT_PAUSED: 'STATUS_PAYMENT_PAUSED',
  SCO_PAUSED: 'PAYMENT_STATUS_SCO_PAUSED',
};
export const VERIFICATION_RESPONSE = {
  NOT_RESPONDED: 'NR',
  CORRECT: 'Y',
  INCORRECT: 'N',
};
export const CERTIFICATION_METHOD = 'MEB';

export const PAYMENT_PAUSED_DAY_OF_MONTH = 25;
