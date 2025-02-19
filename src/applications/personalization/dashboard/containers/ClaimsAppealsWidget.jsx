import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import backendServices from 'platform/user/profile/constants/backendServices';
import {
  appealTypes,
  claimsAvailability,
  appealsAvailability,
} from 'applications/claims-status/utils/appeals-v2-helpers';

import {
  getAppealsV2,
  getClaimsV2,
} from 'applications/claims-status/actions/index';

import AppealListItem from 'applications/claims-status/components/appeals-v2/AppealListItemV2';
import ClaimsUnavailable from 'applications/claims-status/components/ClaimsUnavailable';
import AppealsUnavailable from 'applications/claims-status/components/AppealsUnavailable';
import ClaimsAppealsUnavailable from 'applications/claims-status/components/ClaimsAppealsUnavailable';

import DowntimeNotification, {
  externalServices,
} from 'platform/monitoring/DowntimeNotification';

import { recordDashboardClick } from '../helpers';
import ClaimsListItem from '../components/ClaimsListItem';

class ClaimsAppealsWidget extends React.Component {
  componentDidMount() {
    if (this.props.canAccessClaims) {
      this.props.getClaimsV2();
    }

    if (this.props.canAccessAppeals) {
      this.props.getAppealsV2();
    }
  }

  renderListItem(claim) {
    if (appealTypes.includes(claim.type)) {
      return (
        <AppealListItem
          key={claim.id}
          appeal={claim}
          name={this.props.fullName}
          external
        />
      );
    }

    return <ClaimsListItem claim={claim} key={claim.id} />;
  }

  renderErrorMessages() {
    const {
      claimsLoading,
      appealsLoading,
      appealsAvailable,
      canAccessAppeals,
      canAccessClaims,
      claimsAvailable,
    } = this.props;

    if (claimsLoading || appealsLoading) {
      return null;
    }

    if (
      canAccessAppeals &&
      canAccessClaims &&
      (claimsAvailable !== claimsAvailability.AVAILABLE &&
        appealsAvailable !== appealsAvailability.AVAILABLE)
    ) {
      return <ClaimsAppealsUnavailable />;
    }

    if (canAccessClaims && claimsAvailable !== claimsAvailability.AVAILABLE) {
      return <ClaimsUnavailable />;
    }

    if (
      canAccessAppeals &&
      appealsAvailable !== appealsAvailability.AVAILABLE
    ) {
      return <AppealsUnavailable />;
    }

    return null;
  }

  renderWidgetDowntimeNotification = appName => (downtime, children) => {
    if (downtime.status === 'down') {
      return (
        <div>
          <va-alert isVisible status="warning">
            <h4 className="usa-alert-heading">
              {appName} is down for maintenance
            </h4>
            <div>
              <p>
                We’re making some updates to our {appName.toLowerCase()} tool.
                We’re sorry it’s not working right now and hope to be finished
                by {downtime.startTime.format('MMMM Do')},{' '}
                {downtime.endTime.format('LT')}. Please check back soon.
              </p>
            </div>
          </va-alert>
        </div>
      );
    }
    return children;
  };

  render() {
    const {
      claimsAppealsCount,
      claimsAppealsList,
      claimsLoading,
      appealsLoading,
    } = this.props;

    let content;
    const bothRequestsLoaded = !claimsLoading && !appealsLoading;
    const bothRequestsLoading = claimsLoading && appealsLoading;
    const atLeastOneRequestLoading = claimsLoading || appealsLoading;
    const emptyList = !claimsAppealsList || !claimsAppealsList.length;

    if (bothRequestsLoading || (atLeastOneRequestLoading && emptyList)) {
      content = (
        <va-loading-indicator message="Loading your claims and appeals..." />
      );
    } else if (!emptyList) {
      content = (
        <div>
          <div className="claim-list">
            {atLeastOneRequestLoading && (
              <va-loading-indicator message="Loading your claims and appeals..." />
            )}
            {claimsAppealsList.map(claim => this.renderListItem(claim))}
          </div>
        </div>
      );
    } else if (bothRequestsLoaded) {
      content = <p>We don’t have any new updates for you right now.</p>;
    }

    // hide section if no open/closed claims or appeals
    if (claimsAppealsCount === 0) {
      return null;
    }

    return (
      <div id="claims-widget">
        <h2>Track claims</h2>
        <div>
          <DowntimeNotification
            appTitle="claims"
            dependencies={[externalServices.mhv]}
            render={this.renderWidgetDowntimeNotification('Claims tracking')}
          >
            <div />
          </DowntimeNotification>
          <DowntimeNotification
            appTitle="appeals"
            dependencies={[externalServices.appeals]}
            render={this.renderWidgetDowntimeNotification('Appeals tracking')}
          >
            <div />
          </DowntimeNotification>
          {this.renderErrorMessages()}
          {content}
          <p>
            <Link
              href="/track-claims"
              onClick={recordDashboardClick('view-all-claims')}
            >
              View all your claims and appeals
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }
}

ClaimsAppealsWidget.propTypes = {
  appealsAvailable: PropTypes.bool.isRequired,
  appealsLoading: PropTypes.bool.isRequired,
  canAccessAppeals: PropTypes.bool.isRequired,
  canAccessClaims: PropTypes.bool.isRequired,
  claimsAvailable: PropTypes.string.isRequired,
  claimsLoading: PropTypes.bool.isRequired,
  fullName: PropTypes.string.isRequired,
  getAppealsV2: PropTypes.func.isRequired,
  getClaimsV2: PropTypes.func.isRequired,
  claimsAppealsCount: PropTypes.number,
  claimsAppealsList: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  const claimsState = state.disability.status;
  const claimsV2Root = claimsState.claimsV2;
  const profileState = state.user.profile;
  const canAccessAppeals = profileState.services.includes(
    backendServices.APPEALS_STATUS,
  );
  const canAccessClaims = profileState.services.includes(
    backendServices.EVSS_CLAIMS,
  );

  const claimsAppealsCount = claimsV2Root.appeals.concat(claimsV2Root.claims)
    .length;

  const claimsAppealsList = claimsV2Root.appeals
    .concat(claimsV2Root.claims)
    .filter(c => {
      let updateDate;
      if (c.type === 'evss_claims') {
        const evssPhaseChangeDate = c.attributes.phaseChangeDate;
        const evssDateFiled = c.attributes.dateFiled;
        if (evssPhaseChangeDate && evssDateFiled) {
          // updateDate should be the _more recent_ of either the file date or
          // phase change date
          updateDate = moment(evssPhaseChangeDate).isAfter(
            moment(evssDateFiled),
          )
            ? evssPhaseChangeDate
            : evssDateFiled;
        } else {
          updateDate = evssPhaseChangeDate || evssDateFiled;
        }
      } else {
        // TODO: I believe this is incorrect and the date we actually care about
        // is the most recent date in the array of attributes.event objects
        updateDate = c.attributes.updated;
      }

      return (
        updateDate &&
        moment(updateDate).isAfter(
          moment()
            .endOf('day')
            .subtract(30, 'days'),
        )
      );
    });

  return {
    appealsAvailable: claimsV2Root.v2Availability,
    claimsAvailable: claimsV2Root.claimsAvailability,
    claimsLoading: claimsV2Root.claimsLoading,
    appealsLoading: claimsV2Root.appealsLoading,
    claimsAppealsCount,
    claimsAppealsList,
    synced: claimsState.claimSync.synced,
    canAccessAppeals,
    canAccessClaims,
  };
};

const mapDispatchToProps = {
  getAppealsV2,
  getClaimsV2,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimsAppealsWidget);
export { ClaimsAppealsWidget };
