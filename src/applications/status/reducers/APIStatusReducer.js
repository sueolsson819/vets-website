import {
  FETCHING_API_STATUS,
  FETCHING_API_STATUS_SUCCESS,
  FETCHING_API_STATUS_FAILURE,
} from '../actions';

const initialState = {
  attributes: {},
  errors: null,
  loading: false,
};

export const APIStatus = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_API_STATUS:
      return {
        ...state,
        errors: null,
        loading: true,
      };

    case FETCHING_API_STATUS_SUCCESS:
      return {
        ...state,
        ...action.data,
        errors: null,
        loading: false,
      };

    case FETCHING_API_STATUS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      return state;
  }
};
