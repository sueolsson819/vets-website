import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

import { createPersonalInfoUpdate } from '@@profile/actions/personalInformation';

import { updateFormFieldWithSchema } from '@@vap-svc/actions';
import * as VAP_SERVICE from '@@vap-svc/constants';

import {
  isFailedTransaction,
  isPendingTransaction,
} from '@@vap-svc/util/transactions';
import VAPServiceEditModalErrorMessage from '@@vap-svc/components/base/VAPServiceEditModalErrorMessage';

import { selectVAPServiceTransaction } from '@@vap-svc/selectors';

import ProfileInformationActionButtons from '@@profile/components/ProfileInformationActionButtons';
import LoadingButton from '~/platform/site-wide/loading-button/LoadingButton';

const validationSchema = Yup.object({
  preferredName: Yup.string()
    .max(25, '25 characters maximum')
    .required('Please provide a response')
    .matches(
      /^[A-Za-z]+$/,
      'You can only include letters here (no numbers or special characters).',
    ),
});

const ProfileInformationEditViewFormik = ({
  apiRoute,
  convertCleanDataToPayload,
  fieldName,
  formSchema,
  getInitialFormValues,
  onCancel,
  title,
  uiSchema,
}) => {
  const dispatch = useDispatch();

  const analyticsSectionName = VAP_SERVICE.ANALYTICS_FIELD_MAP[fieldName];

  const initialValues = getInitialFormValues() || { [fieldName]: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      const payload = convertCleanDataToPayload(values, fieldName);
      dispatch(
        createPersonalInfoUpdate({
          route: apiRoute,
          method: 'PUT',
          fieldName,
          payload,
          analyticsSectionName,
          value: values,
        }),
      );
    },
  });

  const { transaction, transactionRequest } = useSelector(state =>
    selectVAPServiceTransaction(state, fieldName),
  );

  const isLoading =
    transactionRequest?.isPending || isPendingTransaction(transaction);
  const error =
    transactionRequest?.error || (isFailedTransaction(transaction) ? {} : null);

  const handleFieldInput = e => {
    const value = { [fieldName]: e?.target?.value };
    dispatch(updateFormFieldWithSchema(fieldName, value, formSchema, uiSchema));
    formik.handleChange(e);
  };

  const handleSubmit = e => {
    formik.handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VaTextInput
        error={formik?.errors?.preferredName}
        label="Provide your preferred name (25 characters maximum)"
        name="preferredName"
        value={formik?.values?.preferredName || ''}
        onInput={handleFieldInput}
        required
      />

      {error && (
        <div
          role="alert"
          className="vads-u-margin-y--2"
          data-testid="edit-error-alert"
        >
          <VAPServiceEditModalErrorMessage error={error} />
        </div>
      )}

      <ProfileInformationActionButtons
        onCancel={onCancel}
        title={title}
        analyticsSectionName={analyticsSectionName}
      >
        <div>
          <LoadingButton
            data-action="save-edit"
            data-testid="save-edit-button"
            isLoading={isLoading}
            loadingText="Saving changes"
            className="vads-u-margin-top--0"
          >
            Update
          </LoadingButton>

          {!isLoading && (
            <button
              data-testid="cancel-edit-button"
              type="button"
              className="usa-button-secondary small-screen:vads-u-margin-top--0"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </ProfileInformationActionButtons>
    </form>
  );
};

ProfileInformationEditViewFormik.propTypes = {
  apiRoute: PropTypes.oneOf(Object.values(VAP_SERVICE.API_ROUTES)).isRequired,
  convertCleanDataToPayload: PropTypes.func.isRequired,
  fieldName: PropTypes.oneOf(Object.values(VAP_SERVICE.FIELD_NAMES)).isRequired,
  formSchema: PropTypes.object.isRequired,
  getInitialFormValues: PropTypes.func.isRequired,
  uiSchema: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default ProfileInformationEditViewFormik;
