import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import { connectFeatureToggle } from 'platform/utilities/feature-toggles';

export default function showVaExpandableAlert(state) {
  connectFeatureToggle(state);
  state.subscribe(() => {
    const flags = toggleValues(state.getState());

    if (
      flags?.showExpandableVamcAlert === 'undefined' ||
      flags?.showExpandableVamcAlert === false
    ) {
      const expandableAlerts = document.querySelectorAll('va-alert-expandable');
      expandableAlerts.forEach(element =>
        element.classList.add('vads-u-display--none'),
      );
    }
  });
}
