import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import recordEvent from 'platform/monitoring/record-event';
import { useDispatch } from 'react-redux';
import InfoAlert from '../../components/InfoAlert';
import { CANCELLATION_REASONS, GA_PREFIX } from '../../utils/constants';
import { startNewAppointmentFlow } from '../redux/actions';

export default function RequestedStatusAlert({ appointment, facility }) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const showConfirmMsg = queryParams.get('confirmMsg');
  const dispatch = useDispatch();

  const canceled = !appointment.cancellable;

  const canceler = new Map([
    [CANCELLATION_REASONS.patient, 'You'],
    [CANCELLATION_REASONS.provider, `${facility?.name || 'Facility'}`],
  ]);
  const who = canceler.get(appointment.cancelationReason);

  if (showConfirmMsg) {
    return (
      <InfoAlert backgroundOnly status={canceled ? 'error' : 'success'}>
        {canceled && `${who || 'Facility'} canceled this appointment.`}
        {!canceled && (
          <>
            <strong>Your appointment request has been submitted. </strong>
            We will review your request and contact you to schedule the first
            available appointment.
            <br />
            <div className=" vads-u-margin-top--1">
              <Link
                to="/"
                onClick={() => {
                  recordEvent({
                    event: `${GA_PREFIX}-view-your-appointments-button-clicked`,
                  });
                }}
              >
                View your appointments
              </Link>
            </div>
            <div className=" vads-u-margin-top--1">
              <Link
                to="/new-appointment"
                onClick={() => {
                  recordEvent({
                    event: `${GA_PREFIX}-schedule-another-appointment-button-clicked`,
                  });
                  dispatch(startNewAppointmentFlow());
                }}
              >
                New appointment
              </Link>
            </div>
          </>
        )}
      </InfoAlert>
    );
  }
  if (!showConfirmMsg) {
    return (
      <InfoAlert backgroundOnly status={canceled ? 'error' : 'info'}>
        {!canceled &&
          'The time and date of this appointment are still to be determined.'}
        {canceled && `${who || 'Facility'} canceled this appointment.`}
      </InfoAlert>
    );
  }

  return null;
}
