import {
  FETCHING_COMMITS,
  FETCHING_COMMITS_FAILURE,
  FETCHING_COMMITS_SUCCESS,
} from '../actions';

const initialState = {
  attributes: {},
  errors: null,
  loading: false,
};

export const LatestCommits = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_COMMITS:
      return {
        ...state,
        errors: null,
        loading: true,
      };

    case FETCHING_COMMITS_SUCCESS:
      return {
        ...state,
        [action.repo]: {
          ...action.data,
        },
        errors: null,
        loading: false,
      };

    case FETCHING_COMMITS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      return state;
  }
};
