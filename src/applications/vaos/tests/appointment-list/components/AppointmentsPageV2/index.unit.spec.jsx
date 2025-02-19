import React from 'react';
import MockDate from 'mockdate';
import { expect } from 'chai';
import moment from 'moment';
import { waitFor, within } from '@testing-library/dom';
import environment from 'platform/utilities/environment';
import { mockFetch, setFetchJSONResponse } from 'platform/testing/unit/helpers';
import userEvent from '@testing-library/user-event';
import {
  createTestStore,
  renderWithStoreAndRouter,
  getTimezoneTestDate,
} from '../../../mocks/setup';
import AppointmentsPageV2 from '../../../../appointment-list/components/AppointmentsPageV2';
import {
  mockAppointmentInfo,
  mockPastAppointmentInfo,
} from '../../../mocks/helpers';
import { getVARequestMock } from '../../../mocks/v0';
import { createMockAppointmentByVersion } from '../../../mocks/data';

const initialState = {
  featureToggles: {
    vaOnlineSchedulingCancel: true,
    vaOnlineSchedulingRequests: true,
    vaOnlineSchedulingPast: true,
    // eslint-disable-next-line camelcase
    show_new_schedule_view_appointments_page: true,
  },
};

describe('VAOS <AppointmentsPageV2>', () => {
  beforeEach(() => {
    mockFetch();
    MockDate.set(getTimezoneTestDate());
    mockAppointmentInfo({});
  });
  afterEach(() => {
    MockDate.reset();
  });

  const userState = {
    profile: {
      facilities: [{ facilityId: '983', isCerner: false }],
    },
  };

  it('should navigate to list URLs on dropdown change', async () => {
    const defaultState = {
      featureToggles: {
        ...initialState.featureToggles,
        vaOnlineSchedulingDirect: true,
        vaOnlineSchedulingCommunityCare: false,
      },
      user: userState,
    };
    mockPastAppointmentInfo({});
    const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
      initialState: defaultState,
    });

    const dropdown = await screen.findByTestId('vaosSelect');

    dropdown.__events.vaSelect({
      detail: { value: 'requested' },
    });

    await waitFor(() =>
      expect(screen.history.push.lastCall.args[0]).to.equal('/requested'),
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Requested appointments',
      }),
    );

    await waitFor(() => {
      expect(global.document.title).to.equal(
        `Requested | VA online scheduling | Veterans Affairs`,
      );
    });

    dropdown.__events.vaSelect({
      detail: { value: 'past' },
    });

    await waitFor(() =>
      expect(screen.history.push.lastCall.args[0]).to.equal('/past'),
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Past appointments',
      }),
    );
    await waitFor(() => {
      expect(global.document.title).to.equal(
        `Past appointments | VA online scheduling | Veterans Affairs`,
      );
    });

    dropdown.__events.vaSelect({
      detail: { value: 'canceled' },
    });

    await waitFor(() =>
      expect(screen.history.push.lastCall.args[0]).to.equal('/canceled'),
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Canceled appointments',
      }),
    );
    await waitFor(() => {
      expect(global.document.title).to.equal(
        `Canceled appointments | VA online scheduling | Veterans Affairs`,
      );
    });

    dropdown.__events.vaSelect({
      detail: { value: 'upcoming' },
    });

    await waitFor(() =>
      expect(screen.history.push.lastCall.args[0]).to.equal('/'),
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Your appointments',
      }),
    );
    await waitFor(() => {
      expect(global.document.title).to.equal(
        `Your appointments | VA online scheduling | Veterans Affairs`,
      );
    });
  });

  it('should render warning message', async () => {
    setFetchJSONResponse(
      global.fetch.withArgs(`${environment.API_URL}/v0/maintenance_windows/`),
      {
        data: [
          {
            id: '139',
            type: 'maintenance_windows',
            attributes: {
              externalService: 'vaosWarning',
              description: 'My description',
              startTime: moment.utc().subtract('1', 'days'),
              endTime: moment.utc().add('1', 'days'),
            },
          },
        ],
      },
    );
    const store = createTestStore(initialState);
    const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
      store,
    });

    expect(
      await screen.findByRole('heading', {
        level: 3,
        name: /You may have trouble using the VA appointments tool right now/,
      }),
    ).to.exist;
  });

  it('start scheduling button should open new appointment flow', async () => {
    const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
      initialState: {
        ...initialState,
        user: userState,
      },
    });

    expect(screen.getByText(/Schedule primary or specialty care appointments./))
      .to.be.ok;
    userEvent.click(
      await screen.findByRole('button', { name: /Start scheduling/i }),
    );

    await waitFor(() =>
      expect(screen.history.push.lastCall.args[0]).to.equal('/new-appointment'),
    );
  });

  describe('when appointment status improvement flag is on', () => {
    const defaultState = {
      featureToggles: {
        ...initialState.featureToggles,
        vaOnlineSchedulingDirect: true,
        vaOnlineSchedulingCommunityCare: false,
        vaOnlineSchedulingStatusImprovement: true,
      },
      user: userState,
    };

    it('should display updated upcoming appointments page', async () => {
      // Given the veteran lands on the VAOS homepage
      mockPastAppointmentInfo({});

      // When the page displays
      const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
        initialState: defaultState,
      });

      // Then it should display the upcoming appointments
      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: 'Your appointments',
        }),
      );
      await waitFor(() => {
        expect(global.document.title).to.equal(
          `Your appointments | VA online scheduling | Veterans Affairs`,
        );
      });

      // and breadcrumbs should be updated
      const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(navigation).to.be.ok;
      expect(within(navigation).queryByRole('link', { name: 'Pending' })).not.to
        .exist;
      expect(within(navigation).queryByRole('link', { name: 'Past' })).not.to
        .exist;

      // and scheduling button should be displayed
      expect(
        screen.getByRole('button', { name: 'Start scheduling an appointment' }),
      ).to.be.ok;

      // and appointment list navigation should be displayed
      expect(
        screen.getByRole('navigation', { name: 'Appointment list navigation' }),
      ).to.be.ok;
      expect(screen.getByRole('button', { name: /Pending \(\d\)/ })).to.be.ok;
      expect(screen.getByRole('button', { name: 'Past' })).to.be.ok;

      // and status dropdown should not be displayed
      expect(screen.queryByLabelText('Show by status')).not.to.exists;
    });

    it('should display updated appointment request page', async () => {
      // Given the veteran lands on the VAOS homepage
      const startDate = moment.utc();
      const appointment = getVARequestMock();
      appointment.attributes = {
        ...appointment.attributes,
        status: 'Submitted',
        optionDate1: startDate,
        optionTime1: 'AM',
        purposeOfVisit: 'New Issue',
        bestTimetoCall: ['Morning'],
        email: 'patient.test@va.gov',
        phoneNumber: '5555555566',
        typeOfCareId: '323',
        reasonForVisit: 'Back pain',
        friendlyLocationName: 'Some VA medical center',
        comment: 'loss of smell',
        facility: {
          ...appointment.attributes.facility,
          facilityCode: '983GC',
        },
      };
      appointment.id = '1234';
      mockAppointmentInfo({ requests: [appointment] });

      // When the page displays
      const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
        initialState: defaultState,
      });

      // Then it should display upcoming appointments
      await screen.findByRole('heading', { name: 'Your appointments' });

      // When the veteran clicks the Pending button
      let navigation = await screen.findByRole('button', {
        name: /^Pending \(1\)/,
      });
      userEvent.click(navigation);
      await waitFor(() =>
        expect(screen.history.push.lastCall.args[0]).to.equal('/pending'),
      );

      // Then it should display the requested appointments
      await waitFor(() => {
        expect(
          screen.findByRole('heading', {
            level: 1,
            name: 'Pending appointments',
          }),
        );
      });
      await waitFor(() => {
        expect(global.document.title).to.equal(
          `Pending appointments | VA online scheduling | Veterans Affairs`,
        );
      });

      // and breadcrumbs should be updated
      navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(within(navigation).queryByRole('link', { name: 'Pending' })).to.be
        .ok;
      expect(within(navigation).queryByRole('link', { name: 'Past' })).not.to
        .exist;

      expect(
        screen.getByText(
          'Your appointment requests that haven’t been scheduled yet.',
        ),
      ).to.be.ok;

      // and scheduling button should not be displayed
      expect(
        screen.queryByRole('button', {
          name: 'Start scheduling an appointment',
        }),
      ).not.to.exist;

      // and status dropdown should not be displayed
      expect(screen.queryByLabelText('Show by status')).not.to.exists;

      expect(
        global.window.dataLayer.some(
          e => e === `vaos-status-pending-link-clicked`,
        ),
      );
    });

    it('should display updated past appointment page', async () => {
      // Given the veteran lands on the VAOS homepage
      const pastDate = moment().subtract(3, 'months');
      const data = {
        id: '1234',
        kind: 'clinic',
        clinic: 'fake',
        start: pastDate.format(),
        locationId: '983GC',
        status: 'booked',
      };
      const appointment = createMockAppointmentByVersion({
        version: 0,
        ...data,
      });
      mockPastAppointmentInfo({ va: [appointment] });

      // When the page displays
      const screen = renderWithStoreAndRouter(<AppointmentsPageV2 />, {
        initialState: defaultState,
      });

      // Then it should display the upcoming appointments
      await screen.findByRole('heading', { name: 'Your appointments' });

      // When the veteran clicks the Past button
      let navigation = screen.getByRole('button', { name: 'Past' });
      userEvent.click(navigation);
      await waitFor(() =>
        expect(screen.history.push.lastCall.args[0]).to.equal('/past'),
      );

      // Then it should display the past appointments
      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: 'Past appointments',
        }),
      ).to.be.ok;
      await waitFor(() => {
        expect(global.document.title).to.equal(
          `Past appointments | VA online scheduling | Veterans Affairs`,
        );
      });

      // and breadcrumbs should be updated
      navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(within(navigation).queryByRole('link', { name: 'Pending' })).not.to
        .be.ok;
      expect(within(navigation).queryByRole('link', { name: 'Past' })).to.exist;

      const dropdown = await screen.findByTestId('vaosSelect');

      // and date range dropdown should be displayed
      expect(dropdown).to.have.attribute('label', 'Select a date range');

      // and scheduling button should not be displayed
      expect(
        screen.queryByRole('button', {
          name: 'Start scheduling an appointment',
        }),
      ).not.to.exist;

      // and status dropdown should not be displayed
      expect(screen.queryByLabelText('Show by status')).not.to.exists;

      expect(
        global.window.dataLayer.some(
          e => e === `vaos-status-past-link-clicked`,
        ),
      );
    });
  });
});
