import React from 'react';
import { VaModal } from 'web-components/react-bindings';
import PropTypes from 'prop-types';
import { FETCH_STATUS } from '../../../utils/constants';
import getEligibilityMessage from './getEligibilityMessage';

export default function EligibilityModal({
  onClose,
  eligibility,
  facilityDetails,
  typeOfCare,
}) {
  const { title, content } = getEligibilityMessage({
    eligibility,
    facilityDetails,
    typeOfCare,
    includeFacilityContactInfo: true,
  });

  return (
    <VaModal
      id="eligibilityModal"
      status="warning"
      visible
      onCloseEvent={onClose}
      hideCloseButton={status === FETCH_STATUS.loading}
      modalTitle={title}
      data-testid="eligibilityModal"
      role="alertdialog"
    >
      <div aria-atomic="true" aria-live="assertive">
        {content}
      </div>
    </VaModal>
  );
}
EligibilityModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  eligibility: PropTypes.object,
  facilityDetails: PropTypes.object,
  typeOfCare: PropTypes.object,
};
