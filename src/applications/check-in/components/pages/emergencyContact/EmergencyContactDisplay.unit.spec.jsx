import React from 'react';
import { expect } from 'chai';
import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { axeCheck } from 'platform/forms-system/test/config/helpers';
import EmergencyContactDisplay from './EmergencyContactDisplay';

describe('pre-check-in experience', () => {
  describe('shared components', () => {
    describe('EmergencyContactDisplay', () => {
      it('passes axeCheck', () => {
        axeCheck(<EmergencyContactDisplay />);
      });
      it('renders with default values', () => {
        const { getByText } = render(<EmergencyContactDisplay />);
        expect(getByText('Is this your current emergency contact?')).to.exist;
      });
      it('renders the footer if footer is supplied', () => {
        const { getByText } = render(
          // eslint-disable-next-line react/jsx-no-bind
          <EmergencyContactDisplay Footer={() => <div>foo</div>} />,
        );
        expect(getByText('foo')).to.exist;
      });

      it('renders emergency contact data', () => {
        const emergencyContact = {
          name: 'Bugs Bunny',
          workPhone: '5554445555',
          address: {
            street1: '123 Turtle Trail',
            street2: '',
            street3: '',
            city: 'Treetopper',
            state: 'Tennessee',
            zip: '101010',
          },
          relationship: 'Uncle',
          phone: '5552223333',
        };
        const { getByText } = render(
          <EmergencyContactDisplay data={emergencyContact} />,
        );
        expect(getByText('Address')).to.exist;
        expect(getByText('Phone')).to.exist;
        expect(getByText('Work phone')).to.exist;
        expect(getByText('Name')).to.exist;
        expect(getByText('Relationship')).to.exist;
        expect(getByText('123 Turtle Trail')).to.exist;
        expect(getByText('Treetopper, Tennessee 10101')).to.exist;
        expect(getByText('555-222-3333')).to.exist;
        expect(getByText('555-444-5555')).to.exist;
        expect(getByText('Uncle')).to.exist;
      });

      it('fires the yes function', () => {
        const yesClick = sinon.spy();
        const screen = render(<EmergencyContactDisplay yesAction={yesClick} />);
        fireEvent.click(screen.getByTestId('yes-button'));
        expect(yesClick.calledOnce).to.be.true;
      });
      it('fires the no function', () => {
        const noClick = sinon.spy();
        const screen = render(<EmergencyContactDisplay noAction={noClick} />);
        fireEvent.click(screen.getByTestId('no-button'));
        expect(noClick.calledOnce).to.be.true;
      });
    });
  });
});
