import React from 'react'
import { useState } from 'react';
import {  CFormTextarea, CFormSelect } from '@coreui/react';
const TextBox = () => {
    const [fontSize, setFontSize] = useState(16); // Default font size
  const [text, setText] = useState(''); // Text entered in the textarea

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value)); // Convert selected font size to integer
  };

  // Function to handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  return (
    <div>
       <div>
      
      <CFormTextarea
        id="exampleFormControlTextarea1"
        label="Text-box"
        rows={3}
        value={text}
        onChange={handleTextChange}
        style={{ fontSize: `${fontSize}px` }} // Set the font size dynamically
      />
      {/* Dropdown for font size */}
    </div>
    </div>
  )
}

export default TextBox
