import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@department-of-veterans-affairs/formulate';

import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';
import Form from 'platform/forms/formulate-integration/Form';
// import { connect } from 'react-redux';

// import {
//   hasTricareWhatIsMyPolicyNumberDescription,
//   healthInsuranceCoverageQuestionDescription,
// } from '../helpers';

const InsuranceProviderPage = ({
  data,
  goBack,
  goForward,
  onReviewPage,
  updatePage,
}) => {
  const navButtons = <FormNavButtons goBack={goBack} submitToContinue />;
  const updateButton = <button type="submit">Review update button</button>;
  return (
    <Formik
      initialValues={data}
      onSubmit={onReviewPage ? updatePage : goForward}
    >
      <Form>
        <TextField name="insuranceName" label="Name of provider" required />
        <TextField
          name="insurancePolicyHolderName"
          label="'Name of policyholder"
          required
        />
        <br />
        <div>
          <p>
            Provide either your insurance policy number or group code.
            <span className="required">(*Required)</span>
          </p>

          <TextField name="insurancePolicyNumber" label="Policy number" />
          <p>
            <strong>or</strong>
          </p>
          <TextField name="insuranceGroupCode" label="Group code" />
        </div>

        {onReviewPage ? updateButton : navButtons}
      </Form>
    </Formik>
  );
};

// const mapStateToProps = state => ({
//   providers: state.form,
// });

// export default connect(mapStateToProps)(InsuranceProvidersComponent);
export default InsuranceProviderPage;
