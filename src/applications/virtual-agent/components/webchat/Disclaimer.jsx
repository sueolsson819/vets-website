export const Disclaimer = () => {
  return (
    <va-accordion
      disableAnalytics={{
        value: 'false',
      }}
      openSingle={{
        value: undefined,
      }}
      sectionHeading={{
        value: 'null',
      }}
    >
      <va-accordion-item header="Disclaimer" bordered>
        <ul>
          <li>
            This virtual agent is still in development and cannot help with
            personal, medical or mental health emergencies. Thank you for
            understanding.{' '}
          </li>
          <li>
            We keep a record of all virtual agent conversations, so we ask that
            you do not enter personal information that can be used to identify
            you.
          </li>
        </ul>
      </va-accordion-item>
    </va-accordion>
  );
};
