import React from 'react';

export default function FieldsetTitle({ title = 'no title for old men' }) {
  return (
    <legend className="schemaform-block-title schemaform-block-subtitle">
      {title}
    </legend>
  );
}
