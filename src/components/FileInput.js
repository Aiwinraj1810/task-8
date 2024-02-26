import React, { useState } from 'react';
import {  CButton, CContainer, CFormInput, } from '@coreui/react';
const FileInput = ({ onImageUrlUpdate }) => {
  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [secureUrl, setSecureUrl] = useState('');

  const uploadImage = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "xckb82k7");
    formData.append("cloud_name", "dur23cis9");

    fetch("https://api.cloudinary.com/v1_1/dur23cis9/image/upload", {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.secure_url) {
          console.log("Secure URL:", data.secure_url);
          setSecureUrl(data.secure_url);
          onImageUrlUpdate(data.secure_url);
          alert('Image uploaded')
        } else {
          throw new Error("Secure URL not found in response");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewUrl(URL.createObjectURL(selectedImage));
  };

  const handleRemoveImage = () => {
    setImage('');
    setPreviewUrl('');
    
  };

  return (
    <CContainer>
      <CFormInput type='file' onChange={handleFileChange} />
      {previewUrl && (
        <CContainer style={{ marginTop: 10 }}>
          <img src={previewUrl} alt='preview' style={{ width: 100 }} />
          <CButton onClick={uploadImage}>Upload</CButton>
          <CButton onClick={handleRemoveImage}>Remove</CButton>
        </CContainer>
      )}
      {secureUrl && (
        <CFormInput style={{ display: 'none' }} type='text' value={secureUrl} disabled />
      )}
    </CContainer>
  );
};

export default FileInput;
