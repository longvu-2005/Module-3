import React from 'react';

export const SubmitButton = ({ label }) => {
  return (
    <button type="submit" className="btn-submit">
      {label}
    </button>
  );
};