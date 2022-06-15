import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import scrollToTop from 'platform/utilities/ui/scrollToTop';
import { focusElement } from 'platform/utilities/ui';

import { hasSession } from 'platform/user/profile/utilities';

export class ConfirmationPage extends React.Component {
  componentDidMount() {
    focusElement('.schemaform-title > h1');
    scrollToTop('topScrollElement');
  }

  render() {
    const { form } = this.props;
    const { submission, data } = form;
    const { response } = submission;

    let name;
    if (hasSession()) {
      // authenticated user, get name from profile
      const { user } = this.props;
      name = user.userFullName;
    } else {
      // unauthenticated user, get name from form data
      name = data.veteranFullName;
    }
    const first = name.first || '';
    const middle = name.middle || '';
    const last = name.last || '';
    const suffix = name.suffix || '';

    let emailMessage;

    const dateTitle = 'Date submitted';
    if (data.email) {
      emailMessage = (
        <div>
          <p>We’ll contact you by email if we:</p>
          <ul>
            <li>
              Successfully receive and process your application,
              <strong>or</strong>
            </li>
            <li>Can't process your application for any reason</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="confirmation-page">
        <p>
          <strong>Please print this page for your records.</strong>
        </p>
        <div className="inset">
          <h2 className="schemaform-confirmation-claim-header">
            Thank you for submitting your application
          </h2>
          <h3 className="vads-u-font-size--h5">
            Health Care Benefit Claim{' '}
            <span className="additional">(Form 10-10EZ)</span>
          </h3>
          <span>
            for {first} {middle} {last} {suffix}
          </span>

          {response && (
            <ul className="claim-list">
              <li>
                <strong>{dateTitle}</strong>
                <br />
                <span>{moment(response.timestamp).format('MMM D, YYYY')}</span>
              </li>
            </ul>
          )}
        </div>
        <div className="confirmation-guidance-container">
          <h3 className="confirmation-guidance-heading vads-u-font-size--h5">
            How long will it take VA to make a decision on my application?
          </h3>
          <p className="how-long">
            We usually decide on applications within <strong>1 week</strong>.
          </p>
          {emailMessage}
          <p>
            If we need you to provide more information or documents, we’ll
            contact you by mail.
          </p>
          <p>
            <strong>
              If we haven’t contacted you within a week after you submitted your
              application
            </strong>
          </p>
          <p>
            Please don’t apply again. Instead, please call our toll-free hotline
            at <va-telephone contact="877-222-8387" />. We’re here Monday
            through Friday, 8:00 am to 8:00 pm ET.
          </p>
          <h3 className="confirmation-guidance-heading vads-u-font-size--h5">
            How will I know if I’m enrolled in VA health care?
          </h3>
          <p>
            If enrolled, you’ll receive a Veterans Health Benefits Handbook in
            the mail within about 10 days.
          </p>
          <p>
            We’ll also call to welcome you to the VA health care program, help
            you with scheduling your first appointment, and answer any questions
            you may have about your health care benefits.
          </p>
          <p className="confirmation-guidance-message">
            <a href="/health-care/after-you-apply/">
              Find out what happens after you apply
            </a>
          </p>
          <h3 className="confirmation-guidance-heading vads-u-font-size--h5">
            What if I have more questions?
          </h3>
          <p className="confirmation-guidance-message">
            Please call <va-telephone contact="877-222-8387" /> and select 2.
            We’re here Monday through Friday, 8:00 a.m. to 8:00 p.m. ET.
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user.profile,
  };
}

export default connect(mapStateToProps)(ConfirmationPage);

ConfirmationPage.propTypes = {
  form: PropTypes.object,
  user: PropTypes.object,
};
