import React from 'react';

export const Error400 = () => {
  // If this is not on the introduciton page, we need to render the "what if I have more quesitons" content.
  // Lets check the URL to see if we are on the introduction page
  const locationArray = window.location.pathname.split('/');

  return (
    <div className="row vads-u-margin-bottom--8">
      <va-alert
        close-btn-aria-label="Close notification"
        status="warning"
        visible
      >
        <h3 slot="headline">We can’t find your VA home loan COE status</h3>
        <p>
          You may already have a VA Home loan Certificate of Eligibility but we
          can’t find the information. Please refresh this page or check back
          later. You can also sign out of VA.gov and try signing back into this
          page.
        </p>
        <p>
          If you get this error again, please call the VA.gov help desk at
          <va-telephone contact="8446982311" /> (TTY: 711). We’re here
          Monday–Friday, 8:00 a.m.–8:00 p.m. ET.
        </p>
      </va-alert>
      {locationArray[4] === 'introduction' ? null : (
        <>
          <h2>What if I have more questions?</h2>
          <p>
            If you have any questions that your lender can’t answer, please call
            your VA regional loan center at &nbsp;
            <va-telephone contact="8778273702" />. We’re here Monday through
            Friday, 8:00 a.m. to 6:00 p.m. ET.
          </p>
          <a className="" href="/find-locations/">
            Find your regional loan center
          </a>
        </>
      )}
    </div>
  );
};
