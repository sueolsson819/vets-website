import React from 'react';

const CustomPageReview = ({ data, editPage }) => (
  <>
    <h1>Hello, {data}!</h1>
    <button onClick={editPage}>Edit</button>
  </>
);

export default CustomPageReview;
