import React from 'react';

const Forms = ({ formInputs }) => {
  return (
    <div className='form-wrapper'>
      {/* Check if formInputs is defined and not null before mapping */}
      {formInputs && Object.entries(formInputs).map(([key, value]) => (
        <div key={key}>{value}</div>
      ))}
    </div>
  );
};

export default Forms;
