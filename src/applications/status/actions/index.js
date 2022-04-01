import { apiRequest } from 'platform/utilities/api';
import environment from 'platform/utilities/environment';
import dataDogData from '../data/dataDog.json';

export const FETCHING_API_STATUS = 'FETCHING_API_STATUS';
export const FETCHING_API_STATUS_FAILURE = 'FETCHING_API_STATUS_FAILURE';
export const FETCHING_API_STATUS_SUCCESS = 'FETCHING_API_STATUS_SUCCESS';
export const FETCHING_COMMITS = 'FETCHING_COMMITS';
export const FETCHING_COMMITS_FAILURE = 'FETCHING_COMMITS_FAILURE';
export const FETCHING_COMMITS_SUCCESS = 'FETCHING_COMMITS_SUCCESS';
export const FETCHING_DATADOG = 'FETCHING_DATADOG';
export const FETCHING_DATADOG_FAILURE = 'FETCHING_DATADOG_FAILURE';
export const FETCHING_DATADOG_SUCCESS = 'FETCHING_DATADOG_SUCCESS';

const API_URI = environment.API_URL;

const API_STATUS_URI = `${API_URI}/v0/backend_status`;

export function fetchAPIStatus() {
  return dispatch => {
    dispatch({ type: FETCHING_API_STATUS });

    apiRequest(API_STATUS_URI)
      .then(data => dispatch({ type: FETCHING_API_STATUS_SUCCESS, data }))
      .catch(e => dispatch({ type: FETCHING_API_STATUS_FAILURE, errors: e }));
  };
}

export function fetchLatestCommits(repo) {
  return dispatch => {
    dispatch({ type: FETCHING_COMMITS });
    const dt = new Date();
    dt.setDate(dt.getDate() - 7);
    fetch(
      `https://api.github.com/repos/department-of-veterans-affairs/${repo}/commits?since='${dt.toISOString()}'`,
      {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    )
      .then(response => {
        response.json().then(data => {
          dispatch({ type: FETCHING_COMMITS_SUCCESS, repo, data });
        });
      })
      .catch(e => dispatch({ type: FETCHING_COMMITS_FAILURE, errors: e }));
  };
}

export function fetchDataDogData() {
  return dispatch => {
    dispatch({ type: FETCHING_DATADOG });
    if (dataDogData) {
      dispatch({ type: FETCHING_DATADOG_SUCCESS, dataDogData });
    } else {
      dispatch({ type: FETCHING_DATADOG_FAILURE });
    }
  };
}
