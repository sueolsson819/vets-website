import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PATTERNS } from '@department-of-veterans-affairs/component-library/Telephone';
import { apiRequest } from 'platform/utilities/api';
import DebtLetterCard from './DebtLetterCard';
import { ErrorMessage, DowntimeMessage } from './Alerts';
import OtherVADebts from '../../medical-copays/components/OtherVADebts';
import { cdpAccessToggle } from '../../medical-copays/utils/helpers';

const fetchCopaysResponseAsync = async () => {
  return apiRequest('/medical_copays')
    .then(response => {
      return response.data.length > 0;
    })
    .catch(err => {
      return !err;
    });
};

const DebtCardsList = ({ debts, errors }) => {
  const [hasCopays, setHasCopays] = useState(false);
  const showCDPComponents = useSelector(state => cdpAccessToggle(state));
  const error = errors.length ? errors[0] : [];

  const renderError = () => {
    if (error.status === '504') {
      return <DowntimeMessage />;
    }
    return <ErrorMessage />;
  };

  useEffect(() => {
    fetchCopaysResponseAsync().then(hasCopaysResponse =>
      setHasCopays(hasCopaysResponse),
    );
  }, []);

  return (
    <>
      <h2
        id="currentDebts"
        className="vads-u-margin-top--4 vads-u-margin-bottom--2"
      >
        Current debts
      </h2>

      {error?.status && renderError()}

      {!error?.status &&
        debts.length < 1 && (
          <section
            className="vads-u-background-color--gray-lightest vads-u-padding--3 vads-u-margin-top--3"
            data-testid="debt-list-no-items"
          >
            <h3 className="vads-u-font-family--serif vads-u-margin-top--0 vads-u-font-size--h4">
              Our records show that you don’t have any current debts
            </h3>
            <p className="vads-u-font-family--sans vads-u-margin-bottom--0">
              If you believe that you have a debt with the VA, call the Debt
              Management Center at
              <va-telephone
                className="vads-u-margin-left--0p5"
                contact="8008270648"
              />
              .
            </p>
            <p className="vads-u-font-family--sans vads-u-margin-bottom--0">
              For medical copayment debts, visit
              <a
                className="vads-u-margin-x--0p5"
                href="/health-care/pay-copay-bill/"
              >
                Pay your VA copay bill
              </a>
              to learn about your payment options.
            </p>
          </section>
        )}

      {!error?.status &&
        debts.length > 0 && (
          <>
            <div className="vads-u-margin-top--3" data-testid="debt-list">
              {debts.map((debt, index) => (
                <DebtLetterCard
                  key={`${index}-${debt.fileNumber}`}
                  debt={debt}
                />
              ))}
            </div>
          </>
        )}

      <section>
        <h3 className="vads-u-font-size--h4">
          What if my debt isn’t listed here?
        </h3>
        <p className="vads-u-font-family--sans">
          If you received a letter about a VA benefit debt that isn’t listed
          here, call us at
          <va-telephone
            contact="800-827-0648"
            className="vads-u-margin-x--0p5"
          />
          (or
          <va-telephone
            contact="1-612-713-6415"
            pattern={PATTERNS.OUTSIDE_US}
            className="vads-u-margin-x--0p5"
          />
          from overseas).
        </p>
        <p className="vads-u-font-family--sans vads-u-margin-bottom--0">
          For medical co-payment debt, please go to
          <a
            className="vads-u-margin-x--0p5"
            href="/health-care/pay-copay-bill/"
          >
            Pay your VA copay bill
          </a>
          to learn about your payment options.
        </p>

        {showCDPComponents && hasCopays && <OtherVADebts module="LTR" />}

        <h3
          id="downloadDebtLetters"
          className="vads-u-margin-top--4 vads-u-font-size--h2"
        >
          Download debt letters
        </h3>
        <p className="vads-u-margin-bottom--0 vads-u-font-family--sans">
          You can download some of your letters for education, compensation and
          pension debt.
        </p>

        <Link
          to="/debt-letters"
          className="vads-u-margin-top--1 vads-u-font-family--sans"
          data-testid="download-letters-link"
        >
          Download letters related to your va debt
        </Link>
      </section>
    </>
  );
};

DebtCardsList.propTypes = {
  debts: PropTypes.arrayOf(
    PropTypes.shape({
      fileNumber: PropTypes.string,
    }),
  ),
  errors: PropTypes.array,
};

DebtCardsList.defaultProps = {
  errors: [],
  debts: [],
};

const mapStateToProps = ({ debtLetters }) => ({
  debts: debtLetters.debts,
  errors: debtLetters.errors,
});

export default connect(mapStateToProps)(DebtCardsList);
