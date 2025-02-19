import React from 'react';
import { CONTACTS } from '@department-of-veterans-affairs/component-library/contacts';

function GetFormHelp() {
  return (
    <div>
      <p className="help-talk">
        <strong> If you have trouble using this online application,</strong>{' '}
        call our MyVA411 main information line at{' '}
        <va-telephone contact={CONTACTS.HELP_DESK} /> (TTY:{' '}
        <va-telephone contact={CONTACTS['711']} />
        ). We’re here 24/7.
      </p>
      <p>
        <strong>
          If you need help to gather your information or fill out your
          application/form,{' '}
        </strong>
        <a href="https://va.gov/vso/">
          contact a local Veterans Service Organization (VSO).
        </a>
      </p>
      <p className="help-talk">
        <strong>If you have questions about VA health care,</strong> call our
        Health Eligibility Center at{' '}
        <va-telephone contact={CONTACTS['222_VETS']} /> (TTY:{' '}
        <va-telephone contact={CONTACTS['711']} />
        ). We’re here Monday through Friday, 8:00 a.m. to 8:00 p.m.{' '}
        <abbr title="eastern time">ET</abbr>.
      </p>
    </div>
  );
}

export default GetFormHelp;
