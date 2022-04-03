import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Breadcrumbs from '@department-of-veterans-affairs/component-library/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectFeatureStatusImprovement } from '../redux/selectors';
import { updateBreadcrumb } from '../appointment-list/redux/actions';

export default function VAOSBreadcrumbs({ children }) {
  const featureStatusImprovement = useSelector(state =>
    selectFeatureStatusImprovement(state),
  );
  const dispatch = useDispatch();
  const breadcrumbs = useSelector(state => state.appointments.breadcrumbs);
  const match = useRouteMatch();

  return (
    <Breadcrumbs className="medium-screen:vads-u-padding-x--0 vaos-appts__breadcrumbs">
      <a href="/" key="home">
        Home
      </a>
      <a href="/health-care" key="health-care">
        Health care
      </a>
      <a
        href="/health-care/schedule-view-va-appointments"
        key="schedule-view-va-appointments"
      >
        Schedule and manage health appointments
      </a>
      {!featureStatusImprovement && (
        <Link to="/appointments?redirect=false" key="vaos-home">
          VA online scheduling
        </Link>
      )}
      {featureStatusImprovement && (
        <Link
          to={`${
            match.url.endsWith('/') ? match.url.slice(0, 1) : match.url
          }/appointments?redirect=false`}
          key="vaos-home"
          onClick={() => dispatch(updateBreadcrumb())}
        >
          Your appointments
        </Link>
      )}
      {featureStatusImprovement &&
        breadcrumbs.map(breadcrumb => {
          return (
            <Link to={breadcrumb.path} key="breadcrumb.path">
              {breadcrumb.title}
            </Link>
          );
        })}
      {children}
    </Breadcrumbs>
  );
}

VAOSBreadcrumbs.propTypes = {
  children: PropTypes.node,
};
