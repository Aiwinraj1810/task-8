import React, { useState } from 'react';
import { CContainer, CButton } from '@coreui/react';
import uploadIMG from '../Assets/upload-img.png'
import axios from 'axios';

const DragandDrop = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleFileChange = (selectedFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(selectedFile);
      setPreviewUrl(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
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
      // Assuming you have access to width and height properties
      dimensions: `${file.width}x${file.height}`
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <CContainer
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
    >
      {!file && (
        <div>
          <p>Drag & Drop your image here or</p>
            <CContainer>
              <img src={uploadIMG} alt='upload' />
            </CContainer>
        </div>
      )}
      {previewUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
        </div>
      )}
      {file && (
        <div style={{ marginTop: '10px' }}>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
          <CButton color="primary" onClick={handleAddImageDetails} style={{ marginLeft: '10px' }}>
            Add Image Details
          </CButton>
        </div>
      )}
    </CContainer>
  );
};

export default DragandDrop;
