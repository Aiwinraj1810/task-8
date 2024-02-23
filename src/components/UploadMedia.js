import React, { useState } from 'react';
import { CFormInput, CButton, CContainer } from '@coreui/react';
import axios from 'axios';

const UploadMedia = ({inputLabel}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleAddImageDetails = () => {
    // Prepare image details object
    const imageDetails = {
      name: file.name,
      size: file.size,
      dimensions: `${file.width}x${file.height}` // Assuming you have access to width and height properties
    };

    // Send POST request to server
    axios.post('http://localhost:3031/imageDetails', imageDetails)
      .then(response => {
        alert('Image added');
        setFile(null);
        setPreviewUrl(null);
      })
      .catch(error => {
        console.error('Error adding image details:', error);
        // You can handle errors here
      });
  };

  return (
    <>
    {!file && (
      <CContainer>
        <CFormInput type="file" id="formFileLg" label={inputLabel} onChange={handleFileChange} />
      </CContainer>
    )}
    {previewUrl && (
      <CContainer style={{ marginTop: '10px' }}>
        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
      </CContainer>
    )}
    {file && (
      <CContainer style={{ marginTop: '10px' }}>
        <CButton color="danger" onClick={handleDelete}>
          Delete
        </CButton>
        <CButton color="primary" onClick={handleAddImageDetails} style={{ marginLeft: '10px' }}>
          Add
        </CButton>
      </CContainer>
    )}
  </>
  
  );
};

export default UploadMedia;
