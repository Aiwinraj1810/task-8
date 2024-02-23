// In InputBox.js component
import React from 'react';

const InputBox = ({ value, onChange, label }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input 
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputBox;
