import React from 'react';

const InsuranceProviderPageReview = ({ data, editPage }) => (
  <>
    <h1>{data.insuranceName} !</h1>
    <button onClick={editPage}>Edit</button>
  </>
);

export default InsuranceProviderPageReview;
