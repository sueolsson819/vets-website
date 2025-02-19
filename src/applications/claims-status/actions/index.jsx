import React from 'react';
import * as Sentry from '@sentry/browser';

import recordEvent from 'platform/monitoring/record-event';
import { apiRequest } from 'platform/utilities/api';
import get from 'platform/utilities/data/get';
import environment from 'platform/utilities/environment';
import localStorage from 'platform/utilities/storage/localStorage';

import {
  getErrorStatus,
  USER_FORBIDDEN_ERROR,
  RECORD_NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  BACKEND_SERVICE_ERROR,
  FETCH_APPEALS_ERROR,
  FETCH_APPEALS_PENDING,
  FETCH_CLAIMS_PENDING,
  FETCH_CLAIMS_SUCCESS,
  FETCH_CLAIMS_ERROR,
  ROWS_PER_PAGE,
  CHANGE_INDEX_PAGE,
  UNKNOWN_STATUS,
} from '../utils/appeals-v2-helpers';
import { makeAuthRequest, roundToNearest } from '../utils/helpers';
import { mockApi } from '../tests/e2e/fixtures/mocks/mock-api';

// NOTE: This should only be TRUE when developing locally
const USE_MOCKS = environment.isLocalhost() && !window.Cypress;

// -------------------- v2 and v1 -------------
export const FETCH_APPEALS_SUCCESS = 'FETCH_APPEALS_SUCCESS';
// -------------------- v1 --------------------
export const SET_CLAIMS = 'SET_CLAIMS';
export const SET_APPEALS = 'SET_APPEALS';
export const FETCH_CLAIMS = 'FETCH_CLAIMS';
export const FETCH_APPEALS = 'FETCH_APPEALS';
export const FETCH_STEM_CLAIMS_PENDING = 'FETCH_STEM_CLAIMS_PENDING';
export const FETCH_STEM_CLAIMS_SUCCESS = 'FETCH_STEM_CLAIMS_SUCCESS';
export const FETCH_STEM_CLAIMS_ERROR = 'FETCH_STEM_CLAIMS_ERROR';
export const FILTER_CLAIMS = 'FILTER_CLAIMS';
export const SORT_CLAIMS = 'SORT_CLAIMS';
export const CHANGE_CLAIMS_PAGE = 'CHANGE_CLAIMS_PAGE';
export const GET_CLAIM_DETAIL = 'GET_CLAIM_DETAIL';
export const SET_CLAIM_DETAIL = 'SET_CLAIM_DETAIL';
export const GET_APPEALS_DETAIL = 'GET_APPEALS_DETAIL';
export const SUBMIT_DECISION_REQUEST = 'SUBMIT_DECISION_REQUEST';
export const SET_DECISION_REQUESTED = 'SET_DECISION_REQUESTED';
export const SET_DECISION_REQUEST_ERROR = 'SET_DECISION_REQUEST_ERROR';
export const SET_CLAIMS_UNAVAILABLE = 'SET_CLAIMS_UNAVAILABLE';
export const SET_APPEALS_UNAVAILABLE = 'SET_APPEALS_UNAVAILABLE';
export const SET_UNAUTHORIZED = 'SET_UNAUTHORIZED';
export const RESET_UPLOADS = 'RESET_UPLOADS';
export const ADD_FILE = 'ADD_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';
export const SUBMIT_FILES = 'SUBMIT_FILES';
export const SET_UPLOADING = 'SET_UPLOADING';
export const SET_UPLOADER = 'SET_UPLOADER';
export const DONE_UPLOADING = 'DONE_UPLOADING';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const CANCEL_UPLOAD = 'CANCEL_UPLOAD';
export const SET_FIELDS_DIRTY = 'SET_FIELD_DIRTY';
export const SHOW_CONSOLIDATED_MODAL = 'SHOW_CONSOLIDATED_MODAL';
export const SET_LAST_PAGE = 'SET_LAST_PAGE';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_ADDITIONAL_EVIDENCE_NOTIFICATION =
  'SET_ADDITIONAL_EVIDENCE_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const CLEAR_ADDITIONAL_EVIDENCE_NOTIFICATION =
  'CLEAR_ADDITIONAL_EVIDENCE_NOTIFICATION';
export const HIDE_30_DAY_NOTICE = 'HIDE_30_DAY_NOTICE';

export function setNotification(message) {
  return {
    type: SET_NOTIFICATION,
    message,
  };
}

export function setAdditionalEvidenceNotification(message) {
  return {
    type: SET_ADDITIONAL_EVIDENCE_NOTIFICATION,
    message,
  };
}

export function getAppeals(filter) {
  return dispatch => {
    dispatch({ type: FETCH_APPEALS });

    makeAuthRequest(
      '/v0/appeals',
      null,
      dispatch,
      appeals => {
        dispatch({ type: SET_APPEALS, filter, appeals: appeals.data });
      },
      () => dispatch({ type: SET_APPEALS_UNAVAILABLE }),
    );
  };
}

export function fetchAppealsSuccess(response) {
  const appeals = response.data;
  return {
    type: FETCH_APPEALS_SUCCESS,
    appeals,
  };
}

export function getAppealsV2() {
  return dispatch => {
    dispatch({ type: FETCH_APPEALS_PENDING });
    return apiRequest('/appeals')
      .then(appeals => dispatch(fetchAppealsSuccess(appeals)))
      .catch(error => {
        const status = getErrorStatus(error);
        const action = { type: '' };
        switch (status) {
          case '403':
            action.type = USER_FORBIDDEN_ERROR;
            break;
          case '404':
            action.type = RECORD_NOT_FOUND_ERROR;
            break;
          case '422':
            action.type = VALIDATION_ERROR;
            break;
          case '502':
            action.type = BACKEND_SERVICE_ERROR;
            break;
          default:
            action.type = FETCH_APPEALS_ERROR;
            break;
        }
        Sentry.withScope(scope => {
          scope.setFingerprint(['{{default}}', status]);
          Sentry.captureException(`vets_appeals_v2_err_get_appeals ${status}`);
        });
        return dispatch(action);
      });
  };
}

export function fetchClaimsSuccess(response) {
  const claims = response.data;
  const pages = Math.ceil(claims.length / ROWS_PER_PAGE);
  return {
    type: FETCH_CLAIMS_SUCCESS,
    claims,
    pages,
  };
}

export function pollRequest(options) {
  const {
    onError,
    onSuccess,
    pollingExpiration,
    pollingInterval,
    request = apiRequest,
    shouldFail,
    shouldSucceed,
    target,
  } = options;
  return request(
    target,
    null,
    response => {
      if (shouldSucceed(response)) {
        onSuccess(response);
        return;
      }

      if (shouldFail(response)) {
        onError(response);
        return;
      }

      if (pollingExpiration && Date.now() > pollingExpiration) {
        onError(null);
        return;
      }

      setTimeout(pollRequest, pollingInterval, options);
    },
    error => onError(error),
  );
}

export function getSyncStatus(claimsAsyncResponse) {
  return get('meta.syncStatus', claimsAsyncResponse, null);
}

const recordClaimsAPIEvent = ({ startTime, success, error }) => {
  const event = {
    event: 'api_call',
    'api-name': 'GET claims',
    'api-status': success ? 'successful' : 'failed',
  };
  if (error) {
    event['error-key'] = error;
  }
  if (startTime) {
    const apiLatencyMs = roundToNearest({
      interval: 5000,
      value: Date.now() - startTime,
    });
    event['api-latency-ms'] = apiLatencyMs;
  }
  recordEvent(event);
  if (event['error-key']) {
    recordEvent({
      'error-key': undefined,
    });
  }
};

export function getClaimsV2(options = {}) {
  // Throw an error if an unsupported value is on the `options` object
  const recognizedOptions = ['poll', 'pollingExpiration'];
  Object.keys(options).forEach(option => {
    if (!recognizedOptions.includes(option)) {
      throw new TypeError(
        `Unrecognized option "${option}" passed to "getClaimsV2"\nOnly the following options are supported:\n${recognizedOptions.join(
          '\n',
        )}`,
      );
    }
  });
  const { poll = pollRequest, pollingExpiration } = options;
  const startTimestampMs = Date.now();
  return dispatch => {
    dispatch({ type: FETCH_CLAIMS_PENDING });

    if (USE_MOCKS) {
      return mockApi.getClaimList().then(mockClaimsList => {
        return dispatch(fetchClaimsSuccess(mockClaimsList));
      });
    }

    return poll({
      onError: response => {
        const errorCode = getErrorStatus(response);
        if (errorCode && errorCode !== UNKNOWN_STATUS) {
          Sentry.withScope(scope => {
            scope.setFingerprint(['{{default}}', errorCode]);
            Sentry.captureException(
              `vets_claims_v2_err_get_claims ${errorCode}`,
            );
          });
        }
        // This onError callback will be called with a null response arg when
        // the API takes too long to return data
        if (response === null) {
          recordClaimsAPIEvent({
            startTime: startTimestampMs,
            success: false,
            error: '504 Timed out - API took too long',
          });
        } else {
          recordClaimsAPIEvent({
            startTime: startTimestampMs,
            success: false,
            error: errorCode,
          });
        }

        return dispatch({ type: FETCH_CLAIMS_ERROR });
      },
      onSuccess: response => {
        recordClaimsAPIEvent({
          startTime: startTimestampMs,
          success: true,
        });
        dispatch(fetchClaimsSuccess(response));
      },
      pollingExpiration,
      pollingInterval: window.VetsGov.pollTimeout || 5000,
      shouldFail: response => getSyncStatus(response) === 'FAILED',
      shouldSucceed: response => getSyncStatus(response) === 'SUCCESS',
      target: '/evss_claims_async',
    });
  };
}

export function filterClaims(filter) {
  return {
    type: FILTER_CLAIMS,
    filter,
  };
}
export function sortClaims(sortProperty) {
  return {
    type: SORT_CLAIMS,
    sortProperty,
  };
}
export function changePage(page) {
  return {
    type: CHANGE_CLAIMS_PAGE,
    page,
  };
}

export function changePageV2(page) {
  return {
    type: CHANGE_INDEX_PAGE,
    page,
  };
}

export function setUnavailable() {
  return {
    type: SET_CLAIMS_UNAVAILABLE,
  };
}

export function getClaimDetail(id, router, poll = pollRequest) {
  return dispatch => {
    dispatch({
      type: GET_CLAIM_DETAIL,
    });

    if (USE_MOCKS) {
      return mockApi.getClaimDetails(id).then(mockDetails => {
        return dispatch({
          type: SET_CLAIM_DETAIL,
          claim: mockDetails.data,
          meta: mockDetails.meta,
        });
      });
    }

    return poll({
      onError: response => {
        if (response.status !== 404 || !router) {
          return dispatch({ type: SET_CLAIMS_UNAVAILABLE });
        }

        return router.replace('your-claims');
      },
      onSuccess: response =>
        dispatch({
          type: SET_CLAIM_DETAIL,
          claim: response.data,
          meta: response.meta,
        }),
      pollingInterval: window.VetsGov.pollTimeout || 5000,
      shouldFail: response => getSyncStatus(response) === 'FAILED',
      shouldSucceed: response => getSyncStatus(response) === 'SUCCESS',
      target: `/evss_claims_async/${id}`,
    });
  };
}

export function submitRequest(id) {
  return dispatch => {
    dispatch({
      type: SUBMIT_DECISION_REQUEST,
    });
    makeAuthRequest(
      `/v0/evss_claims/${id}/request_decision`,
      { method: 'POST' },
      dispatch,
      () => {
        dispatch({ type: SET_DECISION_REQUESTED });
        dispatch(
          setNotification({
            title: 'Request received',
            body:
              'Thank you. We have your claim request and will make a decision.',
          }),
        );
      },
      error => {
        dispatch({ type: SET_DECISION_REQUEST_ERROR, error });
      },
    );
  };
}

export function resetUploads() {
  return {
    type: RESET_UPLOADS,
  };
}

export function addFile(files, { isEncrypted = false } = {}) {
  return {
    type: ADD_FILE,
    files,
    isEncrypted,
  };
}

export function removeFile(index) {
  return {
    type: REMOVE_FILE,
    index,
  };
}

function calcProgress(totalFiles, totalSize, filesComplete, bytesComplete) {
  const ratio = 0.8;

  return (
    (filesComplete / totalFiles) * (1 - ratio) +
    (bytesComplete / totalSize) * ratio
  );
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION,
  };
}

export function clearAdditionalEvidenceNotification() {
  return {
    type: CLEAR_ADDITIONAL_EVIDENCE_NOTIFICATION,
  };
}

export function submitFiles(claimId, trackedItem, files) {
  let filesComplete = 0;
  let bytesComplete = 0;
  let hasError = false;
  const totalSize = files.reduce((sum, file) => sum + file.file.size, 0);
  const totalFiles = files.length;
  const trackedItemId = trackedItem ? trackedItem.trackedItemId : null;
  recordEvent({
    event: 'claims-upload-start',
  });

  return dispatch => {
    dispatch(clearNotification());
    dispatch(clearAdditionalEvidenceNotification());
    dispatch({
      type: SET_UPLOADING,
      uploading: true,
    });
    dispatch({
      type: SET_PROGRESS,
      progress: 0,
    });
    require.ensure(
      [],
      require => {
        const csrfTokenStored = localStorage.getItem('csrfToken');
        const { FineUploaderBasic } = require('fine-uploader/lib/core');
        const uploader = new FineUploaderBasic({
          request: {
            endpoint: `${
              environment.API_URL
            }/v0/evss_claims/${claimId}/documents`,
            inputName: 'file',
            customHeaders: {
              'X-Key-Inflection': 'camel',
              'X-CSRF-Token': csrfTokenStored,
            },
          },
          cors: {
            expected: true,
            sendCredentials: true,
          },
          multiple: false,
          callbacks: {
            onAllComplete: () => {
              if (!hasError) {
                recordEvent({
                  event: 'claims-upload-success',
                });
                dispatch({
                  type: DONE_UPLOADING,
                });
                dispatch(
                  setNotification({
                    title: 'We have your evidence',
                    body: (
                      <span>
                        Thank you for sending us{' '}
                        {trackedItem
                          ? trackedItem.displayName
                          : 'additional evidence'}
                        . We will associate it with your record in a matter of
                        days. If the submitted evidence impacts the status of
                        your claim, then you will see that change within 30 days
                        of submission.
                        <br />
                        Note: It may take a few minutes for your uploaded file
                        to show here. If you don’t see your file, please try
                        refreshing the page.
                      </span>
                    ),
                  }),
                );
              } else {
                recordEvent({
                  event: 'claims-upload-failure',
                });
                dispatch({
                  type: SET_UPLOAD_ERROR,
                });
                dispatch(
                  setAdditionalEvidenceNotification({
                    title: `Error uploading ${hasError?.fileName || 'files'}`,
                    body:
                      hasError?.errors?.[0]?.title ||
                      'There was an error uploading your files. Please try again',
                    type: 'error',
                  }),
                );
              }
            },
            onTotalProgress: bytes => {
              bytesComplete = bytes;
              dispatch({
                type: SET_PROGRESS,
                progress: calcProgress(
                  totalFiles,
                  totalSize,
                  filesComplete,
                  bytesComplete,
                ),
              });
            },
            onComplete: () => {
              filesComplete++;
              dispatch({
                type: SET_PROGRESS,
                progress: calcProgress(
                  totalFiles,
                  totalSize,
                  filesComplete,
                  bytesComplete,
                ),
              });
            },
            onError: (_id, fileName, _reason, { response, status }) => {
              if (status === 401) {
                dispatch({
                  type: SET_UNAUTHORIZED,
                });
              }
              if (status < 200 || status > 299) {
                hasError = JSON.parse(response || '{}');
                hasError.fileName = fileName;
              }
            },
          },
        });
        dispatch({
          type: SET_UPLOADER,
          uploader,
        });
        dispatch({
          type: SET_PROGRESS,
          progress: filesComplete / files.length,
        });

        /* eslint-disable camelcase */
        files.forEach(({ file, docType, password }) => {
          uploader.addFiles(file, {
            tracked_item_id: trackedItemId,
            document_type: docType.value,
            password: password.value,
          });
        });
        /* eslint-enable camelcase */
      },
      'claims-uploader',
    );
  };
}

export function updateField(path, field) {
  return {
    type: UPDATE_FIELD,
    path,
    field,
  };
}

export function cancelUpload() {
  return (dispatch, getState) => {
    const { uploader } = getState().disability.status.uploads;
    recordEvent({
      event: 'claims-upload-cancel',
    });

    if (uploader) {
      uploader.cancelAll();
    }

    dispatch({
      type: CANCEL_UPLOAD,
    });
  };
}

export function setFieldsDirty() {
  return {
    type: SET_FIELDS_DIRTY,
  };
}

export function showConsolidatedMessage(visible) {
  return {
    type: SHOW_CONSOLIDATED_MODAL,
    visible,
  };
}

export function setLastPage(page) {
  return {
    type: SET_LAST_PAGE,
    page,
  };
}

export function hide30DayNotice() {
  return {
    type: HIDE_30_DAY_NOTICE,
  };
}

export function getStemClaims() {
  return dispatch => {
    dispatch({ type: FETCH_STEM_CLAIMS_PENDING });

    makeAuthRequest(
      '/v0/education_benefits_claims/stem_claim_status',
      null,
      dispatch,
      response => {
        const stemClaims = response.data.map(claim => {
          return {
            ...claim,
            attributes: {
              ...claim.attributes,
              claimType: 'STEM',
              phaseChangeDate: claim.attributes.submittedAt,
            },
          };
        });

        dispatch({
          type: FETCH_STEM_CLAIMS_SUCCESS,
          stemClaims,
        });
      },
      () => dispatch({ type: FETCH_STEM_CLAIMS_ERROR }),
    );
  };
}
