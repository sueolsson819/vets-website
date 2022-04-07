import React from 'react';
import PropTypes from 'prop-types';
import Telephone from '@department-of-veterans-affairs/component-library/Telephone';
import { LocationType } from '../../../constants';
import { parsePhoneNumber } from '../../../utils/phoneNumbers';
import CCProviderPhoneLink from './CCProviderPhoneLink';

// Hard Coded Phone Number will be removed
// when we can get phone number from an API
const visNEightNumber = (
  result,
  query,
  facilityLocatorShowHealthConnectNumber,
) => {
  if (
    result?.attributes?.visn === '8' &&
    query?.facilityType === 'health' &&
    facilityLocatorShowHealthConnectNumber
  ) {
    return '877-741-3400';
  }
  if (result?.attributes?.visn === '2' && query?.facilityType === 'health') {
    return '800-877-6976';
  }
  if (result?.attributes?.visn === '17' && query?.facilityType === 'health') {
    return '833-284-7212';
  }
  return '';
};

export const renderPhoneNumber = (
  title,
  subTitle = null,
  phone,
  from,
  location,
) => {
  if (!phone) {
    return null;
  }

  const { formattedPhoneNumber, extension, contact } = parsePhoneNumber(phone);

  // The Telephone component will throw an error if passed an invalid phone number.
  // Since we can't use try/catch or componentDidCatch here, we'll just do this:
  if (contact.length !== 10) {
    return null;
  }

  const phoneNumberId = `${location.id}-${title.replaceAll(/\s+/g, '')}`;

  return (
    <div>
      {from === 'FacilityDetail' && (
        <i aria-hidden="true" role="presentation" className="fa fa-phone" />
      )}
      {title && <strong id={phoneNumberId}>{title}: </strong>}
      {subTitle}
      <Telephone
        className={
          subTitle ? 'vads-u-margin-left--0p5' : 'vads-u-margin-left--0p25'
        }
        contact={contact}
        extension={extension}
        ariaDescribedById={phoneNumberId}
      >
        {formattedPhoneNumber}
      </Telephone>
    </div>
  );
};

// NOTE: Do not use this component to display Covid19 appointment phone numbers.
// Use Covid19PhoneLink instead.

const LocationPhoneLink = ({
  location,
  from,
  query,
  showHealthConnectNumber = false,
}) => {
  const isProvider = location.type === LocationType.CC_PROVIDER;
  const { phone } = location.attributes;
  const healthConnectNumber = visNEightNumber(
    location,
    query,
    showHealthConnectNumber,
  );

  if (isProvider) {
    return (
      <CCProviderPhoneLink
        location={location}
        query={query}
        renderPhoneNumber={renderPhoneNumber}
      />
    );
  }

  return (
    <div className="facility-phone-group vads-u-margin-top--2">
      {renderPhoneNumber('Main number', null, phone.main, from, location)}
      {showHealthConnectNumber && <div style={{ minHeight: '20px' }} />}
      {showHealthConnectNumber &&
        renderPhoneNumber(
          'VA health connect',
          null,
          healthConnectNumber,
          from,
          location,
        )}
      {phone.mentalHealthClinic && <div style={{ minHeight: '20px' }} />}
      {renderPhoneNumber(
        'Mental health',
        null,
        phone.mentalHealthClinic,
        from,
        location,
      )}
    </div>
  );
};

LocationPhoneLink.propTypes = {
  location: PropTypes.object,
  from: PropTypes.string,
  query: PropTypes.object,
  showHealthConnectNumber: PropTypes.string,
};

export default LocationPhoneLink;
