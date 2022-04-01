import {
  FETCHING_DATADOG,
  FETCHING_DATADOG_SUCCESS,
  FETCHING_DATADOG_FAILURE,
} from '../actions';

const initialState = {
  attributes: {},
  errors: null,
  loading: false,
};

export const DataDogData = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATADOG:
      return {
        ...state,
        errors: null,
        loading: true,
      };

    case FETCHING_DATADOG_SUCCESS:
      return {
        ...state,
        ...action,
        errors: null,
        loading: false,
      };

    case FETCHING_DATADOG_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      return state;
  }
};
