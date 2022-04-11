import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectPatientFacilities } from 'platform/user/selectors';
import backendServices from 'platform/user/profile/constants/backendServices';
import RequiredLoginView from 'platform/user/authorization/components/RequiredLoginView';
import environment from 'platform/utilities/environment';
import PropTypes from 'prop-types';
import NoRegistrationMessage from './NoRegistrationMessage';

export default function EnrolledRoute({ component: RouteComponent, ...rest }) {
  const user = useSelector(selectUser);
  const sites = useSelector(selectPatientFacilities);
  const hasRegisteredSystems = sites?.length > 0;
  return (
    <RequiredLoginView
      serviceRequired={[
        backendServices.USER_PROFILE,
        backendServices.FACILITIES,
      ]}
      user={user}
      verify={!environment.isLocalhost()}
    >
      <Route {...rest}>
        {!hasRegisteredSystems && <NoRegistrationMessage />}
        {hasRegisteredSystems && <RouteComponent />}
      </Route>
    </RequiredLoginView>
  );
}

EnrolledRoute.propTypes = {
  component: PropTypes.func,
};
