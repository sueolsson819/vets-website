import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const pdfLabel = 'PDF passsword';

const ShowPdfPassword = ({
  file,
  index,
  onSubmitPassword,
  ariaDescribedby = null,
  hasSubmitted,
}) => {
  const [password, setPassword] = useState('');
  const [dirty, setDirty] = useState(hasSubmitted);

  const showError = (hasSubmitted || dirty) && !password;
  return (
    <div className="vads-u-margin-bottom--2">
      <VaTextInput
        label={pdfLabel}
        errorMessage={
          showError && 'Please provide a password to decrypt this file'
        }
        name={`get_password_${index}`}
        required
        value={password}
        onInput={event => {
          console.log(event, event.target.value)
          setPassword(event.target.value);
        }}
        onBlur={() => {
          setDirty(true);
        }}
        maxlength={255}
        ariaDescribedBy={ariaDescribedby}
      />
      <button
        type="button"
        className="usa-button-primary va-button-primary vads-u-width--auto"
        onClick={() => {
          setDirty(true);
          if (password) {
            onSubmitPassword(file, index, password);
          }
        }}
        aria-describedby={ariaDescribedby}
      >
        Add password
      </button>
    </div>
  );
};

ShowPdfPassword.propTypes = {
  ariaDescribedby: PropTypes.string,
  file: PropTypes.shape({}),
  hasSubmitted: PropTypes.bool,
  index: PropTypes.number,
  onSubmitPassword: PropTypes.func,
};

const PasswordLabel = () => (
  <p>
    This is en encrypted PDF document. In order for us to be able to view the
    document, we will need the password to decrypt it.
  </p>
);

const PasswordSuccess = () => (
  <>
    <p className="vads-u-margin-top--2">{pdfLabel}</p>
    <strong>The PDF password has been added.</strong>
  </>
);

export { ShowPdfPassword, PasswordLabel, PasswordSuccess };
