import React from 'react';

const CustomPageReview = ({ data, editPage }) => (
  <>
    <h1>
      Hello, {data.name.first} {data.name.last}!
    </h1>
    <div>FULL DATA OBJECT: {JSON.stringify(data)}</div>
    <button onClick={editPage}>Edit</button>
  </>
);

export default CustomPageReview;
