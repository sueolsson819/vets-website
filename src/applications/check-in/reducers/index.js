const initialState = {
  appointments: [],
  veteranData: {
    demographics: {},
  },
  context: {},
  form: {
    pages: [],
    currentPage: '',
    data: {},
  },
};

import {
  RECORD_ANSWER,
  SET_SESSION,
  SET_VETERAN_DATA,
} from '../actions/pre-check-in';

import {
  recordAnswerHandler,
  setSessionHandler,
  setVeteranDataHandler,
} from './pre-check-in';

import {
  APPOINTMENT_WAS_CHECKED_INTO,
  PERMISSIONS_UPDATED,
  RECEIVED_APPOINTMENT_DETAILS,
  RECEIVED_EMERGENCY_CONTACT_DATA,
  RECEIVED_DEMOGRAPHICS_DATA,
  RECEIVED_NEXT_OF_KIN_DATA,
  SET_TOKEN_CONTEXT,
  TOKEN_WAS_VALIDATED,
  TRIGGER_REFRESH,
  SEE_STAFF_MESSAGE_UPDATED,
  RECEIVED_DEMOGRAPHICS_STATUS,
} from '../actions/day-of';

import {
  appointmentWasCheckedIntoHandler,
  permissionsUpdatedHandler,
  receivedAppointmentDetailsHandler,
  receivedEmergencyContactDataHandler,
  receivedDemographicsDataHandler,
  receivedNextOfKinDataHandler,
  setTokenContextHandler,
  tokenWasValidatedHandler,
  triggerRefreshHandler,
  seeStaffMessageUpdatedHandler,
  receivedDemographicsStatusHandler,
} from './day-of';

import { GO_TO_NEXT_PAGE, INIT_FORM, UPDATE_FORM } from '../actions/navigation';

import {
  gotToNextPageHandler,
  initFormHandler,
  updateFormHandler,
} from './navigation';

const handler = Object.freeze({
  [INIT_FORM]: initFormHandler,
  [SET_SESSION]: setSessionHandler,
  [GO_TO_NEXT_PAGE]: gotToNextPageHandler,
  [RECORD_ANSWER]: recordAnswerHandler,
  [SET_VETERAN_DATA]: setVeteranDataHandler,
  [APPOINTMENT_WAS_CHECKED_INTO]: appointmentWasCheckedIntoHandler,
  [PERMISSIONS_UPDATED]: permissionsUpdatedHandler,
  [RECEIVED_APPOINTMENT_DETAILS]: receivedAppointmentDetailsHandler,
  [RECEIVED_EMERGENCY_CONTACT_DATA]: receivedEmergencyContactDataHandler,
  [RECEIVED_DEMOGRAPHICS_DATA]: receivedDemographicsDataHandler,
  [RECEIVED_NEXT_OF_KIN_DATA]: receivedNextOfKinDataHandler,
  [SET_TOKEN_CONTEXT]: setTokenContextHandler,
  [TOKEN_WAS_VALIDATED]: tokenWasValidatedHandler,
  [TRIGGER_REFRESH]: triggerRefreshHandler,
  [SEE_STAFF_MESSAGE_UPDATED]: seeStaffMessageUpdatedHandler,
  [RECEIVED_DEMOGRAPHICS_STATUS]: receivedDemographicsStatusHandler,
  [UPDATE_FORM]: updateFormHandler,

  default: state => {
    return { ...state };
  },
});

const checkInReducer = (state = initialState, action) => {
  // console.log('handling action: ', action.type, { action });
  if (handler[action.type]) {
    return handler[action.type](state, action);
  }
  return handler.default(state, action);
};

export default {
  checkInData: checkInReducer,
};
