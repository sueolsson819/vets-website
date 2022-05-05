import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router-dom';

const ProfileAccessibleHeader = ({ routes }) => {
  const location = useLocation();

  const currentRoute = routes.find(route =>
    matchPath(location.pathname, route),
  );

  return (
    <>
      <h1 className="vads-u-visibility--screen-reader">{currentRoute?.name}</h1>
    </>
  );
};

ProfileAccessibleHeader.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      requiresLOA3: PropTypes.bool.isRequired,
      requiresMVI: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default ProfileAccessibleHeader;
