import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

function LanguageSelector({ showFormI18n }) {
  const { i18n } = useTranslation();

  // TODO: add a forced change to en if the feature toggle is not on
  if (!showFormI18n) return null;

  const languageOptions = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Español' },
    tl: { nativeName: 'Tagalog' },
  };

  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="row vads-u-margin-y--2">
      <div className="usa-width-two-thirds medium-8 columns text-right">
        <div>
          {Object.keys(languageOptions).map((lng, i, items) => (
            <span key={lng}>
              <button
                style={{
                  fontWeight: i18n.language === lng ? 'bold' : 'normal',
                }}
                onClick={() => handleLanguageChange(lng)}
                className="va-button-link"
              >
                {languageOptions[lng].nativeName}
              </button>
              {i !== items.length - 1 && (
                <span
                  className=" vads-u-margin-left--0p5 vads-u-margin-right--0p5 vads-u-color--gray
                vads-u-height--20"
                >
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loading: toggleValues(state).loading,
  showFormI18n: toggleValues(state)[FEATURE_FLAG_NAMES.showFormI18n],
});

LanguageSelector.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LanguageSelector);
