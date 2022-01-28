import React from 'react';

import DownloadLink from './DownloadLink';

const downloadText = 'Download your COE (PDF) 0.20MB';

const ReviewAndDownload = ({ downloadUrl }) => (
  <>
    <div>
      <h2>Review and download your COE</h2>
      <p>
        You can download your COE right now. If you need help, go to our
        instructions for how to download and open a VA.gov PDF form.
        <br />
        <a href="/resources/how-to-download-and-open-a-vagov-pdf-form/">
          Get instructions for downloading a VA.gov PDF
        </a>
      </p>
    </div>
    <div className="vads-u-padding-top--2">
      <DownloadLink href={downloadUrl} text={downloadText} />
    </div>
  </>
);

export default ReviewAndDownload;
