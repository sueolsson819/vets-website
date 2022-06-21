import moment from 'moment';
import titleCase from 'platform/utilities/data/titleCase';
import { selectVAPResidentialAddress } from 'platform/user/selectors';
import { LANGUAGES, PURPOSE_TEXT_V2 } from '../../../utils/constants';
import {
  getTypeOfCare,
  getFormData,
  getChosenCCSystemById,
  getChosenClinicInfo,
  getChosenSlot,
} from '../selectors';
import { getClinicId } from '../../../services/healthcare-service';

function getReasonCode(data) {
  const code = PURPOSE_TEXT_V2.filter(purpose => purpose.id !== 'other').find(
    purpose => purpose.id === data.reasonForAppointment,
  )?.short;

  return {
    // If the user selects one of the three preset radio selections
    // ("Routine Follow-up", "New Problem", or "Medication Concern"), then that values goes
    // in reasonCode.coding[0].code.
    coding: code ? [{ code }] : undefined,
    // Per Brad - All comments should be sent in the reasonCode.text field and should should be
    // truncated to 100 char for both VA appointment types only. CC appointments will continue
    // to be truncated to 250 char
    text: data.reasonAdditionalInfo
      ? data.reasonAdditionalInfo.slice(0, 100)
      : null,
  };
}

export function transformFormToVAOSCCRequest(state) {
  const data = getFormData(state);
  const provider = data.communityCareProvider;
  const residentialAddress = selectVAPResidentialAddress(state);
  const parentFacility = getChosenCCSystemById(state);
  let practitioners = [];

  if (provider?.identifier) {
    practitioners = [
      {
        identifier: [
          {
            system: 'http://hl7.org/fhir/sid/us-npi',
            value: data.communityCareProvider.identifier.find(
              item => item.system === 'PPMS',
            )?.value,
          },
        ],
        address: {
          line: provider.address.line,
          city: provider.address.city,
          state: provider.address.state,
          postalCode: provider.address.postalCode,
        },
      },
    ];
  }

  let preferredLocation;

  if (
    residentialAddress &&
    residentialAddress.addressType !== 'OVERSEAS MILITARY'
  ) {
    preferredLocation = {
      city: residentialAddress.city,
      state: residentialAddress.stateCode,
    };
  } else if (parentFacility.address) {
    preferredLocation = {
      city: parentFacility.address.city,
      state: parentFacility.address.state,
    };
  }

  const typeOfCare = getTypeOfCare(data);

  return {
    kind: 'cc',
    status: 'proposed',
    locationId: data.communityCareSystemId,
    serviceType: typeOfCare.idV2 || typeOfCare.ccId,
    // Sending addtional text in both fields for now. Plan is to delete 'comment' field.
    reasonCode: getReasonCode(data),
    comment: data.reasonAdditionalInfo,
    contact: {
      telecom: [
        {
          type: 'phone',
          value: data.phoneNumber,
        },
        {
          type: 'email',
          value: data.email,
        },
      ],
    },
    requestedPeriods: data.selectedDates.map(date => ({
      start: moment.utc(date).format(),
      end: moment
        .utc(date)
        .add(12, 'hours')
        .subtract(1, 'minute')
        .format(),
    })),
    // These four fields aren't in the current schema, but probably should be
    preferredTimesForPhoneCall: Object.entries(data.bestTimeToCall)
      .filter(item => item[1])
      .map(item => titleCase(item[0])),
    preferredLanguage: LANGUAGES.find(
      lang => lang.id === data.preferredLanguage,
    )?.value,
    preferredLocation,
    practitioners,
  };
}

export function transformFormToVAOSVARequest(state) {
  const data = getFormData(state);
  const typeOfCare = getTypeOfCare(data);

  return {
    kind: data.visitType,
    status: 'proposed',
    locationId: data.vaFacility,
    // This may need to change when we get the new service type ids
    serviceType: typeOfCare.idV2,
    reasonCode: getReasonCode(data),
    contact: {
      telecom: [
        {
          type: 'phone',
          value: data.phoneNumber,
        },
        {
          type: 'email',
          value: data.email,
        },
      ],
    },
    requestedPeriods: data.selectedDates.map(date => ({
      start: moment.utc(date).format(),
      end: moment
        .utc(date)
        .add(12, 'hours')
        .subtract(1, 'minute')
        .format(),
    })),
    // This field isn't in the schema yet
    preferredTimesForPhoneCall: Object.entries(data.bestTimeToCall)
      .filter(item => item[1])
      .map(item => titleCase(item[0])),
  };
}

// function getUserMessage(data) {
//   const label = PURPOSE_TEXT.find(
//     purpose => purpose.id === data.reasonForAppointment,
//   ).short;

//   return `${label}: ${data.reasonAdditionalInfo}`;
// }

export function transformFormToVAOSAppointment(state) {
  const data = getFormData(state);
  const clinic = getChosenClinicInfo(state);
  const slot = getChosenSlot(state);

  // slot start and end times are not allowed on a booked va appointment.
  delete slot.start;
  delete slot.end;

  return {
    kind: 'clinic',
    status: 'booked',
    clinic: getClinicId(clinic),
    slot,
    extension: {
      desiredDate: `${data.preferredDate}T00:00:00+00:00`,
    },
    locationId: data.vaFacility,
    reasonCode: getReasonCode(data),
    // removing this for now, it's preventing QA from testing, will re-introduce when the team figures out how we're handling the comment field
    // comment: getUserMessage(data),
  };
}
