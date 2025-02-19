// Node modules.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
// Relative imports.
import {
  selectPatientFacilities,
  selectPatientFacilitiesDsot,
} from 'platform/user/selectors';
import AuthContent from '../AuthContent';
import UnauthContent from '../UnauthContent';

export const App = ({ facilities }) => {
  const cernerFacilities = facilities?.filter(f => f.usesCernerAppointments);
  const otherFacilities = facilities?.filter(f => !f.usesCernerAppointments);
  if (!isEmpty(cernerFacilities)) {
    return (
      <AuthContent
        cernerFacilities={cernerFacilities}
        otherFacilities={otherFacilities}
      />
    );
  }

  return <UnauthContent />;
};

App.propTypes = {
  // From mapStateToProps.
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      facilityId: PropTypes.string.isRequired,
      isCerner: PropTypes.bool.isRequired,
      usesCernerAppointments: PropTypes.bool,
      usesCernerMedicalRecords: PropTypes.bool,
      usesCernerMessaging: PropTypes.bool,
      usesCernerRx: PropTypes.bool,
      usesCernerTestResults: PropTypes.bool,
    }).isRequired,
  ),
};

const mapStateToProps = state => ({
  facilities: state?.featureToggles?.pwEhrCtaDrupalSourceOfTruth
    ? selectPatientFacilitiesDsot(state)
    : selectPatientFacilities(state),
});

export default connect(
  mapStateToProps,
  null,
)(App);
