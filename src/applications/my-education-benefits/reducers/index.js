import { createSaveInProgressFormReducer } from 'platform/forms/save-in-progress/reducers';
import formConfig from '../config/form';
// import set from 'platform/utilities/data/set';

import {
  FETCH_PERSONAL_INFORMATION_SUCCESS,
  FETCH_PERSONAL_INFORMATION_FAILED,
  FETCH_CLAIM_STATUS_SUCCESS,
  FETCH_CLAIM_STATUS_FAILURE,
  FETCH_ELIGIBILITY_SUCCESS,
  FETCH_ENROLLMENT_SUCCESS,
  FETCH_ENROLLMENT_FAILURE,
} from '../actions';

const initialState = {
  formData: {},
  form: {
    data: {},
  },
};

export default {
  form: createSaveInProgressFormReducer(formConfig),
  data: (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PERSONAL_INFORMATION_SUCCESS:
      case FETCH_PERSONAL_INFORMATION_FAILED:
        return {
          ...state,
          formData: action?.response || {},
          // errors: action?.response?.errors || {},
        };
      case FETCH_CLAIM_STATUS_SUCCESS:
      case FETCH_CLAIM_STATUS_FAILURE:
        return {
          ...state,
          claimStatus: action?.response?.attributes || {},
        };
      case FETCH_ELIGIBILITY_SUCCESS:
        return {
          ...state,
          eligibility: action?.response || {},
        };
      case FETCH_ENROLLMENT_SUCCESS:
      case FETCH_ENROLLMENT_FAILURE:
        return {
          ...state,
          enrollment: action.response || {},
        };
      default:
        return state;
    }
  },
};
