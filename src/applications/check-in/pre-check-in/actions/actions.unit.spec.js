import { expect } from 'chai';

import {
  SET_SESSION,
  createSetSession,
  recordAnswer,
  RECORD_ANSWER,
  setVeteranData,
  SET_VETERAN_DATA,
} from './index';

describe('pre-check-in', () => {
  describe('actions', () => {
    describe('createSetSession', () => {
      it('should return correct action', () => {
        const action = createSetSession({});
        expect(action.type).to.equal(SET_SESSION);
      });
      it('should return correct structure', () => {
        const action = createSetSession({
          token: 'some-token',
          permissions: 'some-permission',
        });
        expect(action.payload.token).to.equal('some-token');
        expect(action.payload.permissions).to.equal('some-permission');
      });
    });
    describe('recordAnswer', () => {
      it('should return correct action', () => {
        const action = recordAnswer({});
        expect(action.type).to.equal(RECORD_ANSWER);
      });
      it('should return correct structure', () => {
        const action = recordAnswer({
          demographicsUpToDate: 'yes',
        });
        expect(action.payload.demographicsUpToDate).equal('yes');
      });
    });
    describe('setVeteranData', () => {
      it('should return correct action', () => {
        const action = setVeteranData({});
        expect(action.type).to.equal(SET_VETERAN_DATA);
      });
      it('should return correct structure', () => {
        const action = setVeteranData({
          appointments: [
            { appointmentIen: 'abc-123' },
            {
              appointmentIen: 'def-456',
            },
          ],
          demographics: { lastName: 'Smith' },
        });
        expect(action.payload.appointments).to.be.an('array');
        expect(action.payload.appointments).to.deep.equal([
          { appointmentIen: 'abc-123' },
          { appointmentIen: 'def-456' },
        ]);

        expect(action.payload.demographics).to.be.an('object');
        expect(action.payload.demographics).to.deep.equal({
          lastName: 'Smith',
        });
      });
    });
  });
});
