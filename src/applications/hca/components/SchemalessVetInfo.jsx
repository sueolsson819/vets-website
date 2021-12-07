import React from 'react';

// import InitializeVAPServiceID from '@@vap-svc/containers/InitializeVAPServiceID';
// import ContactInformationField from '@@vap-svc/components/ContactInformationField';
// import { FIELD_NAMES } from '@@vap-svc/constants';

const buildPage = ({ title }) => (
  <div>
    <h1>Hello from {title}!</h1>
  </div>
);

const SchemalessVetInfo = () => {
  buildPage({ title: 'this here schemaless thing' });
};

export default SchemalessVetInfo;
