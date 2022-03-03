/**
 * @module services/Location
 */
import environment from 'platform/utilities/environment';

/*
 * Functions in here should map a var-resources API request to a similar response from
 * a FHIR resource request
 */

import {
  getFacilitiesBySystemAndTypeOfCare,
  getFacilityInfo,
  getFacilitiesInfo,
  getDirectBookingEligibilityCriteria,
  getRequestEligibilityCriteria,
  getCommunityCareFacilities,
  getCommunityCareFacility,
  getParentFacilities,
  getSitesSupportingVAR,
} from '../var';
import { mapToFHIRErrors } from '../utils';
import {
  transformDSFacilities,
  transformFacilities,
  transformFacility,
  setSupportedSchedulingMethods,
  transformCommunityProvider,
  transformCommunityProviders,
  transformSettings,
  transformParentFacilities,
} from './transformers';
import { VHA_FHIR_ID } from '../../utils/constants';
import { calculateBoundingBox } from '../../utils/address';
import {
  getSchedulingConfigurations,
  getFacilities,
  getFacilityById,
} from '../vaos';
import {
  transformParentFacilitiesV2,
  transformFacilitiesV2,
  transformSettingsV2,
  transformFacilityV2,
} from './transformers.v2';

/**
 * Fetch facility information for the facilities in the given site, based on type of care
 *
 * @export
 * @async
 * @param {Object} locationParams Parameters needed for fetching locations
 * @param {String} locationParams.siteId A VistA site id for the locations being pulled
 * @param {String} locationParams.parentId An id for the parent organization of the facilities being pulled
 * @param {String} locationParams.typeOfCareId An id for the type of care to check for the chosen organization
 * @returns {Array<Location>} A FHIR searchset of Location resources
 */
export async function getSupportedLocationsByTypeOfCare({
  siteId,
  parentId,
  typeOfCareId,
}) {
  try {
    const parentFacilities = await getFacilitiesBySystemAndTypeOfCare(
      siteId,
      parentId,
      typeOfCareId,
    );

    return transformDSFacilities(
      // Doing this here because the FHIR service will return only supported facilities
      parentFacilities.filter(
        f => f.directSchedulingSupported || f.requestSupported,
      ),
    ).sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch list of facilities
 *
 * @export
 * @async
 * @param {Object} locationParams Parameters needed for fetching locations
 * @param {Array<string>} locationParams.facilityIds A list of va facility ids to fetch
 * @param {boolean} params.useV2 Use the VAOS v2 endpoints to get locations
 * @returns {Array<Location>} A FHIR searchset of Location resources
 */
export async function getLocations({
  facilityIds,
  children = false,
  useV2 = false,
}) {
  try {
    if (useV2) {
      const facilities = await getFacilities(facilityIds, children);

      return transformFacilitiesV2(facilities);
    }

    const facilities = await getFacilitiesInfo(facilityIds);

    return transformFacilities(facilities);
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch facility information for the given site
 *
 * @export
 * @async
 * @param {Object} locationParams Parameters needed for fetching locations
 * @param {Array<string>} locationParams.facilityId An id for the facility to fetch info for
 * @param {boolean} locationParams.useV2 Use the VAOS v2 endpoints to get locations
 * @returns {Location} A FHIR Location resource
 */
export async function getLocation({ facilityId, useV2 = false }) {
  try {
    if (useV2) {
      const facility = await getFacilityById(facilityId);

      return transformFacilityV2(facility);
    }

    const facility = await getFacilityInfo(facilityId);

    return transformFacility(facility);
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Returns the VAOS settings for the included sites and their children
 *
 * @export
 * @async
 * @param {Object} params
 * @param {Array<string>} params.siteIds The vista site ids of the facilities we want to fetch
 * @param {boolean} params.useV2 Use the VAOS v2 endpoints to get location settings
 * @returns {Array<FacilitySettings>} An array of facility settings
 */
export async function getLocationSettings({ siteIds, useV2 = false }) {
  try {
    if (useV2) {
      const settings = await getSchedulingConfigurations(siteIds);
      return transformSettingsV2(settings);
    }

    const settings = await Promise.all([
      getRequestEligibilityCriteria(siteIds),
      getDirectBookingEligibilityCriteria(siteIds),
    ]);

    return transformSettings(settings);
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Returns facilities with current settings for both direct scheduling
 * and requests for all types of care
 *
 * @export
 * @async
 * @param {Object} params
 * @param {Array<string>} params.siteIds A list of 3 digit site ids to retrieve the settings for
 * @param {boolean} params.useV2 Use the VAOS v2 endpoints to get location info
 * @returns {Array<Location>} An array of Locations with settings included
 */
export async function getLocationsByTypeOfCareAndSiteIds({
  siteIds,
  useV2 = false,
}) {
  try {
    let locations = [];
    let settings = [];

    if (useV2) {
      locations = await getLocations({
        facilityIds: siteIds,
        useV2,
        children: true,
      });

      const uniqueIds = locations.map(location => location.id);
      settings = await getLocationSettings({
        siteIds: uniqueIds,
        useV2,
      });
    } else {
      settings = await getLocationSettings({
        siteIds,
        useV2,
      });

      const uniqueIds = settings.map(setting => setting.id);

      // The above API calls only return the ids. Make an additional
      // call to getLocations so we can get additional details such
      // as name, address, coordinates, etc.
      if (uniqueIds.length) {
        locations = await getLocations({
          facilityIds: uniqueIds,
        });
      }
    }

    locations = locations?.map(location =>
      setSupportedSchedulingMethods({
        location,
        settings,
      }),
    );

    return locations.sort((a, b) => (a.name < b.name ? -1 : 1));
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Pulls the VistA id from an Location resource
 *
 * @export
 * @param {Location} location The location to get an id for
 * @returns {String} Three digit or 5 digit VistA id
 */
export function getFacilityIdFromLocation(location) {
  return location.identifier.find(id => id.system === VHA_FHIR_ID)?.value;
}

/**
 * Returns the siteId of a var location
 *
 * @param {String} id A location's fake FHIR id
 */
export function getSiteIdFromFacilityId(id) {
  return id ? id.substr(0, 3) : null;
}

/**
 * Converts back from a real facility id to our test facility ids
 * in lower environments
 *
 * @export
 * @param {string} facilityId - facility id to convert
 * @returns {string} A facility id with either 442 or 552 replaced with 983 or 984
 */
export function getTestFacilityId(facilityId) {
  if (!environment.isProduction() && facilityId) {
    return facilityId.replace('442', '983').replace('552', '984');
  }

  return facilityId;
}

/**
 * Returns formatted address from facility details object
 *
 * @param {Location} facility A location, or object with an Address field
 * @returns {string} The address, formatted as a string
 */
export function formatFacilityAddress(facility) {
  if (
    facility?.address?.line?.length > 0 &&
    facility?.address?.city &&
    facility?.address?.state &&
    facility?.address?.postalCode
  ) {
    return `${facility.address.line.join(', ')}, ${facility.address.city}, ${
      facility.address.state
    } ${facility.address.postalCode}`;
  }

  return '';
}

/**
 * Returns facility phone number.
 *
 * @export
 * @param {Location} facility The location to find the phone number of
 * @returns {string} Location phone number.
 */
export function getFacilityPhone(facility) {
  return facility?.telecom?.find(tele => tele.system === 'phone')?.value;
}

/**
 * Fetch community care providers by location and type of care
 *
 * @export
 * @async
 * @param {Object} locationParams Parameters needed for fetching providers
 * @param {VAFacilityAddress} locationParams.address The address in VA Profile format to search nearby
 * @param {Object} locationParams.typeOfCare Type of care data to use when searching for providers
 * @param {Number} locationParams.radius The radius to search for providers within, defaulted to 60
 * @param {Number} locationParams.maxResults The max number of results to return from the search
 * @returns {Array<Location>} A FHIR searchset of Location resources
 */
export async function getCommunityProvidersByTypeOfCare({
  address,
  typeOfCare,
  radius = 60,
  maxResults = 15,
}) {
  try {
    const communityCareProviders = await getCommunityCareFacilities({
      bbox: calculateBoundingBox(address.latitude, address.longitude, radius),
      latitude: address.latitude,
      longitude: address.longitude,
      radius,
      specialties: typeOfCare.specialties,
      page: 1,
      perPage: maxResults,
    });

    return transformCommunityProviders(communityCareProviders);
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch a single location associated with the given VistA site id that are
 * marked as VAST parent locations
 *
 * @export
 * @async
 * @param {string} id VistA site id
 * @returns {Object<Location>} A FHIR Location resources
 */

export async function getCommunityProvider(id) {
  try {
    const facility = await getCommunityCareFacility(id);
    return transformCommunityProvider(facility);
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch the locations associated with the given VistA site ids that are
 * marked as VAST parent locations
 *
 * @export
 * @async
 * @param {Object} params
 * @param {Array<string>} params.siteIds A list of three digit VistA site ids
 * @returns {Array<Location>} A list of parent Locations
 */
export async function fetchParentLocations({ siteIds, useV2 }) {
  try {
    const sortFacilitiesMethod = (a, b) => {
      // a.name comes 1st
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      // b.name comes 1st
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      // a.name and b.name are equal
      return 0;
    };

    if (useV2) {
      const facilities = await getFacilities(siteIds, true);
      return transformParentFacilitiesV2(facilities).sort(sortFacilitiesMethod);
    }

    const parentFacilities = await getParentFacilities(siteIds);

    return transformParentFacilities(parentFacilities).sort(
      sortFacilitiesMethod,
    );
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch a list of locations supporting Community Care requests from
 * a given list of locations
 *
 * @export
 * @param {Object} params
 * @param {Array<Location>} params.locations The locations to find CC support at
 * @param {boolean} params.useV2 Use the V2 scheduling configurations endpoint
 *   to get the CC supported locations
 * @returns {Array<Location>} A list of locations that support CC requests
 */
export async function fetchCommunityCareSupportedSites({
  locations,
  useV2 = false,
}) {
  if (useV2) {
    const facilityConfigs = await getSchedulingConfigurations(
      locations.map(location => location.id),
      true,
    );

    return locations.filter(location =>
      facilityConfigs.some(
        facilityConfig => facilityConfig.facilityId === location.id,
      ),
    );
  }

  const ccSites = await getSitesSupportingVAR(
    locations.map(location => location.id),
  );

  return locations.filter(location =>
    ccSites.some(site => site.id === location.id),
  );
}

/**
 * Returns true if a location is associated with one of the provided
 * Cerner site ids
 *
 * @export
 * @param {string} locationId The location id to check
 * @param {Array<string>} [cernerSiteIds=[]] A list of Cerner site ids to check against
 * @returns {Boolean} Returns true if locationId starts with any of the Cerner site ids
 */
export function isCernerLocation(locationId, cernerSiteIds = []) {
  return cernerSiteIds.some(cernerId => locationId?.startsWith(cernerId));
}

/**
 * Returns true if location supports the given type of care
 *
 * @export
 * @param {Location} location The location to check
 * @param {string} typeOfCareId The type of care id to check against
 * @param {Array<string>} [cernerSiteIds=[]] The list of Cerner sites, because Cerner sites
 *   are active for all types of care
 * @returns {Boolean} True if the location supports the type of care (or is a Cerner site)
 */
export function isTypeOfCareSupported(
  location,
  typeOfCareId,
  cernerSiteIds = [],
) {
  return (
    location.legacyVAR.settings[typeOfCareId]?.direct.enabled ||
    location.legacyVAR.settings[typeOfCareId]?.request.enabled ||
    isCernerLocation(location.id, cernerSiteIds)
  );
}
