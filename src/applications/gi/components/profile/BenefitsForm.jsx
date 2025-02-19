import React from 'react';
import PropTypes from 'prop-types';
import EbenefitsLink from 'platform/site-wide/ebenefits/containers/EbenefitsLink';
import ExpandingGroup from '@department-of-veterans-affairs/component-library/ExpandingGroup';
import { ariaLabels } from '../../constants';
import Dropdown from '../Dropdown';
import LearnMoreLabel from '../LearnMoreLabel';

const BenefitsForm = ({
  children,
  cumulativeService,
  eligForPostGiBill,
  eligibilityChange,
  enlistmentService,
  giBillChapter,
  giBillChapterOpen,
  handleInputFocus,
  militaryStatus,
  numberOfDependents,
  optionDisabled,
  showHeader,
  showModal,
  spouseActiveDuty,
}) => {
  const cumulativeServiceOptions = () => [
    { optionValue: '1.0', optionLabel: '36+ months: 100%' }, // notice not 1.00
    { optionValue: '0.9', optionLabel: '30 months: 90%' },
    { optionValue: '0.8', optionLabel: '24 months: 80%' },
    { optionValue: '0.7', optionLabel: '18 months: 70%' },
    { optionValue: '0.6', optionLabel: '6 months: 60%' },
    { optionValue: '0.5', optionLabel: '90 days: 50%' },
    { optionValue: '1.00', optionLabel: 'GYSGT Fry Scholarship: 100%' }, // notice not 1.0
    {
      optionValue: 'service discharge',
      optionLabel: 'Service-Connected Discharge: 100%',
    },
    { optionValue: 'purple heart', optionLabel: 'Purple Heart Service: 100%' },
  ];

  const renderLearnMoreLabel = ({
    text,
    modal,
    ariaLabel,
    labelFor,
    buttonId,
  }) => (
    <LearnMoreLabel
      text={text}
      onClick={() => {
        showModal(modal);
      }}
      ariaLabel={ariaLabel}
      labelFor={labelFor || modal}
      buttonId={buttonId}
    />
  );

  const renderYourMilitaryDetails = () => {
    const chapter33Check = giBillChapter === '33a' || giBillChapter === '33b';
    return (
      <div>
        <ExpandingGroup open={militaryStatus === 'spouse'}>
          <Dropdown
            label="What's your military status?"
            name="militaryStatus"
            options={[
              { optionValue: 'veteran', optionLabel: 'Veteran' },
              { optionValue: 'active duty', optionLabel: 'Active Duty' },
              {
                optionValue: 'national guard / reserves',
                optionLabel: 'National Guard / Reserves',
              },
              { optionValue: 'spouse', optionLabel: 'Spouse' },
              { optionValue: 'child', optionLabel: 'Child' },
            ]}
            value={militaryStatus}
            alt="What's your military status?"
            visible
            onChange={eligibilityChange}
            onFocus={handleInputFocus}
          />
          <Dropdown
            label="Is your spouse currently on active duty?"
            name="spouseActiveDuty"
            options={[
              { optionValue: 'yes', optionLabel: 'Yes' },
              { optionValue: 'no', optionLabel: 'No' },
            ]}
            value={spouseActiveDuty}
            alt="Is your spouse on active duty?"
            visible
            onChange={eligibilityChange}
            onFocus={handleInputFocus}
          />
        </ExpandingGroup>
        <ExpandingGroup
          open={
            ['30', '31', '33a', '33b'].includes(giBillChapter) ||
            giBillChapterOpen.includes(true)
          }
        >
          <Dropdown
            label={renderLearnMoreLabel({
              text: 'Which GI Bill benefit do you want to use?',
              modal: 'giBillChapter',
              ariaLabel: ariaLabels.learnMore.giBillBenefits,
              buttonId: 'gi-bill-benefits-learn-more',
            })}
            name="giBillChapter"
            options={[
              { optionValue: '33a', optionLabel: 'Post-9/11 GI Bill (Ch 33)' },
              { optionValue: '33b', optionLabel: 'Fry Scholarship (Ch 33)' },
              { optionValue: '30', optionLabel: 'Montgomery GI Bill (Ch 30)' },
              {
                optionValue: '1606',
                optionLabel: 'Select Reserve GI Bill (Ch 1606)',
              },
              {
                optionValue: '31',
                optionLabel: 'Veteran Readiness and Employment (VR&E) (Ch 31)',
              },
              {
                optionValue: '35',
                optionLabel:
                  "Survivors' and Dependents' Educational Assistance (DEA) (Ch 35)",
                optionDisabled,
              },
            ]}
            value={giBillChapter}
            alt="Which GI Bill benefit do you want to use?"
            visible
            onChange={eligibilityChange}
            onFocus={handleInputFocus}
          />
          <div>
            {militaryStatus === 'active duty' &&
              chapter33Check && (
                <div className="military-status-info warning form-group">
                  <i className="fa fa-warning" />
                  <a
                    title="Post 9/11 GI Bill"
                    href="http://www.benefits.va.gov/gibill/post911_gibill.asp"
                    id="anch_378"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Post 9/11 GI Bill
                  </a>{' '}
                  recipients serving on Active Duty (or transferee spouses of a
                  service member on active duty) are not eligible to receive a
                  monthly housing allowance.
                </div>
              )}
            {giBillChapter === '31' && (
              <div className="military-status-info info form-group">
                <i className="fa fa-info-circle" />
                To apply for VR&E benefits, please{' '}
                <EbenefitsLink path="ebenefits/about/feature?feature=vocational-rehabilitation-and-employment">
                  visit this site
                </EbenefitsLink>
                .
              </div>
            )}
            <Dropdown
              label={renderLearnMoreLabel({
                text: 'Cumulative Post-9/11 active-duty service',
                modal: 'cumulativeService',
                ariaLabel: ariaLabels.learnMore.post911Chapter33,
                buttonId: 'cumulative-service-learn-more',
              })}
              name="cumulativeService"
              options={cumulativeServiceOptions()}
              value={cumulativeService}
              alt="Cumulative Post-9/11 active-duty service"
              visible={chapter33Check}
              onChange={eligibilityChange}
              onFocus={handleInputFocus}
            />
            <Dropdown
              label={renderLearnMoreLabel({
                text: 'Completed an enlistment of:',
                modal: 'enlistmentService',
                ariaLabel: ariaLabels.learnMore.montgomeryGIBill,
                buttonId: 'enlistment-service',
              })}
              name="enlistmentService"
              options={[
                { optionValue: '3', optionLabel: '3 or more years' },
                { optionValue: '2', optionLabel: '2 or more years' },
              ]}
              value={enlistmentService}
              alt="Completed an enlistment of:"
              visible={giBillChapter === '30'}
              onChange={eligibilityChange}
              onFocus={handleInputFocus}
            />
            <Dropdown
              label="Are you eligible for the Post-9/11 GI Bill?"
              name="eligForPostGiBill"
              options={[
                { optionValue: 'yes', optionLabel: 'Yes' },
                { optionValue: 'no', optionLabel: 'No' },
              ]}
              value={eligForPostGiBill}
              alt="Are you eligible for the Post-9/11 GI Bill?"
              visible={giBillChapter === '31'}
              onChange={eligibilityChange}
              onFocus={handleInputFocus}
            />
            <Dropdown
              label="How many dependents do you have?"
              name="numberOfDependents"
              options={[
                { optionValue: '0', optionLabel: '0 Dependents' },
                { optionValue: '1', optionLabel: '1 Dependent' },
                { optionValue: '2', optionLabel: '2 Dependents' },
                { optionValue: '3', optionLabel: '3 Dependents' },
                { optionValue: '4', optionLabel: '4 Dependents' },
                { optionValue: '5', optionLabel: '5 Dependents' },
              ]}
              value={numberOfDependents}
              alt="How many dependents do you have?"
              visible={giBillChapter === '31' && eligForPostGiBill === 'no'}
              onChange={eligibilityChange}
              onFocus={handleInputFocus}
            />
            {children}
          </div>
        </ExpandingGroup>
      </div>
    );
  };

  return (
    <div className="eligibility-form">
      {showHeader && <h2>Your benefits</h2>}
      {renderYourMilitaryDetails()}
    </div>
  );
};

export default BenefitsForm;

BenefitsForm.propTypes = {
  children: PropTypes.node,
  cumulativeService: PropTypes.string,
  eligForPostGiBill: PropTypes.string,
  eligibilityChange: PropTypes.func,
  enlistmentService: PropTypes.string,
  giBillChapter: PropTypes.string,
  giBillChapterOpen: PropTypes.arrayOf(PropTypes.bool),
  handleInputFocus: PropTypes.func,
  hideModal: PropTypes.func,
  militaryStatus: PropTypes.string,
  numberOfDependents: PropTypes.string,
  optionDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  showModal: PropTypes.func,
  spouseActiveDuty: PropTypes.string,
  yourMilitaryDetails: PropTypes.bool,
};
