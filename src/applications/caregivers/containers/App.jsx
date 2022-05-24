import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import recordEvent from 'platform/monitoring/record-event';
import formConfig from '../config/form';

const App = ({ loading, children }) => {
  const location = useLocation();
  // find all yes/no check boxes and attach analytics events
  useEffect(
    () => {
      if (!loading) {
        const radios = document.querySelectorAll('input[type="radio"]');
        for (const radio of radios) {
          radio.onclick = e => {
            const label = e.target.nextElementSibling.innerText;
            recordEvent({
              'caregivers-radio-label': label,
              'caregivers-radio-clicked': e.target,
              'caregivers-radio-value-selected': e.target.value,
            });
          };
        }
      }
    },
    [loading, location],
  );

  return loading ? (
    <va-loading-indicator />
  ) : (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
};

const mapStateToProps = state => ({
  loading: toggleValues(state).loading,
});

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any,
  location: PropTypes.string,
};

export default connect(mapStateToProps)(App);
