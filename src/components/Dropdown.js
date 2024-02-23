// In Dropdown.js component
import React from 'react';

const Dropdown = ({ options, selectedOption, onChange }) => {
  const handleDropdownChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleDropdownChange}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

export default Dropdown;
