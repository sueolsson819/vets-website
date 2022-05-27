import React from 'react';
import moment from 'moment';

const TriangleIcon = () => (
  <i
    aria-hidden="true"
    className="fas fa-exclamation-triangle vads-u-margin-right--1"
  />
);
const CircleIcon = () => (
  <i
    aria-hidden="true"
    className="fas fa-exclamation-triangle vads-u-margin-right--1"
  />
);

export const debtSummaryText = (diaryCode, dateOfLetter, balance) => {
  const endDate = (date, days) =>
    moment(date, 'MM-DD-YYYY')
      .add(days, 'days')
      .format('MMMM Do, YYYY,');

  switch (diaryCode) {
    case '71':
      return (
        <p>
          <TriangleIcon /> Contact us to verify your military status
        </p>
      );
    case '655':
    case '817':
      return (
        <p>
          <TriangleIcon /> Submit a Financial Status Report so that we can make
          a decision on your request
        </p>
      );
    case '212':
      return (
        <p>
          <TriangleIcon /> Contact us to update your address
        </p>
      );
    case '061':
    case '065':
    case '070':
    case '440':
    case '442':
    case '448':
    case '453':
      return (
        <p>
          <CircleIcon /> We’ve paused collection on this debt as you requested
        </p>
      );
    case '439': // TODO: Date logic TBD
    case '449':
    case '459': // This one is 30 days
      return (
        <p>
          <TriangleIcon /> Pay your {balance} balance now or request help by{' '}
          {dateOfLetter && endDate(dateOfLetter, 30)}
        </p>
      );
    case '109':
      return (
        <p>
          <TriangleIcon /> Pay your {balance} balance now or request help by{' '}
          {dateOfLetter && endDate(dateOfLetter, 30)}
          to avoid more interest charges
        </p>
      );
    case '100': // TODO: Date Not Listed
    case '102':
    case '130':
    case '140':
      return (
        <p>
          <TriangleIcon /> Pay your {balance} balance now or request help by{' '}
          {dateOfLetter && endDate(dateOfLetter, 30)}.
        </p>
      );
    case '117':
      return (
        <p>
          <TriangleIcon /> Pay your {balance} past due balance in full or
          request help before {dateOfLetter && endDate(dateOfLetter, 60)}
        </p>
      );
    case '123':
      return (
        <p>
          <TriangleIcon /> Pay your {balance} past due balance now or request
          help by {dateOfLetter && endDate(dateOfLetter, 60)}
        </p>
      );
    case '680':
      return (
        <p>
          <TriangleIcon /> Pay your {balance} balance now or request help
        </p>
      );
    case '681':
    case '682':
      return (
        <p>
          <TriangleIcon /> The U.S. Department of the Treasury is offsetting
          your federal payments until your debt is paid
        </p>
      );
    // case '18': Passthrough status for a CRA referral being made
    case '600':
    case '601':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments until your balance
          is paid
        </p>
      );
    case '430':
    case '431':
      return (
        <p>
          <CircleIcon /> We’re offsetting your education benefits each month
          until your debt is paid
        </p>
      );
    case '101':
    case '450':
    case '602':
    case '607':
    case '608':
    case '610':
    case '611':
    case '614':
    case '615':
    case '617':
      return (
        <p>
          <CircleIcon /> We’re offsetting your benefit payments each month until
          your debt is paid
        </p>
      );
    case '603': // TODO: Date Not Listed
    case '613':
      return (
        <p>
          <TriangleIcon /> Make a payment on your {balance} balance or request
          help by {dateOfLetter && endDate(dateOfLetter, 30)}
        </p>
      );
    // case '122': TODO: Passthrough status for a CRA referral being made
    case '080':
    case '850':
    case '852':
    case '860':
    case '855':
      return (
        <p>
          <TriangleIcon /> Contact the U.S. Department of the Treasury to pay
          this debt
        </p>
      );
    case '811':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments while we review your
          compromise offer
        </p>
      );
    case '815': // TODO: Date Not Listed
      return (
        <p>
          <TriangleIcon /> Pay your one time payment as part of your compromise
          agreement by {dateOfLetter && endDate(dateOfLetter, 30)}
        </p>
      );
    case '816':
      return (
        <p>
          <CircleIcon /> We’re processing your compromise offer payment
        </p>
      );
    case '801':
    case '802':
    case '803':
    case '804':
    case '809':
    case '820':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments while we review your
          waiver request
        </p>
      );
    // case '818', '819', '830', '842' Omitted
    case '822':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments while we review your
          dispute
        </p>
      );
    case '825':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments while we review your
          request for a hearing
        </p>
      );
    case '821':
      return (
        <p>
          <TriangleIcon /> Continue making monthly payments while we review your
          Notice of Disagreement
        </p>
      );
    case '002':
    case '005':
    case '032':
    case '609':
    case '321':
    case '400':
    case '420':
    case '421':
    case '422':
    case '627':
      return (
        <p>
          <CircleIcon /> We’re updating your account
        </p>
      );
    case '481':
    case '482':
    case '483':
    case '484':
      return (
        <p>
          <CircleIcon /> We’re reviewing your account
        </p>
      );

    //
    // TODO: No Definition in mockup
    //

    case '425':
    case '081':
    case '500':
    case '510':
    case '503':
    default:
      return (
        <p>
          <TriangleIcon /> We’re updating your account.
        </p>
      );
  }
};
