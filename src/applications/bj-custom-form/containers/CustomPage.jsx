// // CustomPage.jsx
// import React from 'react';
// import { Formik } from 'formik';
// // import { TextField } from '@department-of-veterans-affairs/formulate';

// import FormNavButtons from '~/platform/forms-system/src/js/components/FormNavButtons';
// import Form from '~/platform/forms/formulate-integration/Form';

// // import TextArea from '@department-of-veterans-affairs/component-library/TextArea';

// const CustomPage = ({ data, goBack, goForward, onReviewPage, updatePage }) => {
//   const navButtons = <FormNavButtons goBack={goBack} submitToContinue />;
//   const updateButton = <button type="submit">Review update button</button>;
//   return (
//     <Formik
//       initialValues={data}
//       onSubmit={onReviewPage ? updatePage : goForward}
//     >
//       <Form>
//         <va-alert
//           close-btn-aria-label="Close notification"
//           status="info"
//           visible
//         >
//           <h3 slot="headline">Alert headline</h3>
//           <div>This is an alert</div>
//         </va-alert>
//         {/* <TextArea
//                     charMax={16}
//                     field={{ value: "description" }}
//                     label="Describe your situation"
//                     name="description"
//                     required
//                     onValueChange={function noRefCheck() { }}
//                     placeholder="No more than 16 characters"
//                 /> */}
//         <TextField name="firstName" label="Enter First Name" required />
//         <TextField name="lastName" label="Enter Last Name" required />
//         {onReviewPage ? updateButton : navButtons}
//       </Form>
//     </Formik>
//   );
// };

// export default CustomPage;
