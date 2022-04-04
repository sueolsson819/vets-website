import recordEvent from 'platform/monitoring/record-event';
import { apiRequest } from '~/platform/utilities/api';
import environment from '~/platform/utilities/environment';
import { deductionCodes } from '~/applications/debt-letters/const/deduction-codes';
import {
  DEBTS_FETCH_SUCCESS,
  DEBTS_FETCH_FAILURE,
} from '~/applications/debt-letters/actions';
import { FSR_API_ERROR } from '~/applications/financial-status-report/constants/actionTypes';

export const fetchDebts = () => async dispatch => {
  const getDebts = () => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Key-Inflection': 'camel',
        'Source-App-Name': window.appName,
      },
    };

    return apiRequest(`${environment.API_URL}/v0/debts`, options);
  };

  try {
    const response = await getDebts();
    if (response.errors) {
      recordEvent({
        event: `get-debts-failed`,
        'error-key': `server error`,
        'api-name': 'GET debts',
        'api-status': 'failed',
      });
      return dispatch({
        type: DEBTS_FETCH_FAILURE,
        error: response,
      });
    }
    const approvedDeductionCodes = Object.keys(deductionCodes);
    // filter approved deductionCodes &&
    // remove debts that have a current amount owed of 0
    const filteredResponse = response.debts
      .filter(debt => approvedDeductionCodes.includes(debt.deductionCode))
      .filter(debt => debt.currentAr > 0)
      .map((debt, index) => ({ ...debt, id: index }));
    recordEvent({
      event: `get-debts-successful`,
      'error-key': `server error`,
      'api-name': 'GET debts',
      'api-status': 'successful',
    });
    return dispatch({
      type: DEBTS_FETCH_SUCCESS,
      debts: filteredResponse,
    });
  } catch (error) {
    recordEvent({
      event: `get-debts-failed`,
      'error-key': `internal error`,
      'api-name': 'GET debts',
      'api-status': 'failed',
    });
    dispatch({
      type: FSR_API_ERROR,
      error,
    });
    throw new Error(error);
  }
};
