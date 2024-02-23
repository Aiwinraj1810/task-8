import React from 'react'
import { useState } from 'react';
import { CFormInput, CFormSelect, CInputGroup, CInputGroupText, CFormSwitch, CButton, CContainer, CNav,CNavItem,CTabPane,CTabContent,CNavLink,CFormTextarea } from '@coreui/react';
import UserNotifications from '../components/UserNotifications.js';
import SuprevisorNotifications from '../components/SuprevisorNotifications.js';
import AdminNotifications from '../components/AdminNotifications.js';
import '../styles/notifications.css'
import axios from 'axios';
import UploadMedia from '../components/UploadMedia.js';
import DragandDrop from '../components/DragandDrop.js';

const Classroom = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [formData, setFormData] = useState({
    course: '',
    courseId: '',
    fontSize: '',
    category: '',
    trainingContent: '',
    certificate: '',
    file: '',
    credits: '',
    creditVisibility: false,
    dropClass: false,
    activityReview : false,
    score: '',
    hours: '',
    minutes: '',
   
  });

  

  const handleCreditVisibilityChange = (e) => {
    setFormData({ ...formData, creditVisibility: e.target.checked });

  };
  const handledropClassChange = (e) => {

    setFormData({ ...formData, dropClass: e.target.checked });
  };
  const handleActivityChange = (e) => {

    setFormData({ ...formData, activityReview: e.target.checked });
  };
  
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    // Check if all required fields are filled
    const requiredFields = form.querySelectorAll('[required]');
    let allFieldsFilled = true;
    requiredFields.forEach((field) => {
      if (!field.value) {
        allFieldsFilled = false;
        return;
      }
    });

    // If any required field is empty, show alert
    if (!allFieldsFilled) {
      alert('Please fill in all required fields.');
      return;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // Post data using axios
    axios
      .post('http://localhost:3031/Enrollment', formData) // Update the URL endpoint
      .then((response) => {
        alert('Classroom Data saved');
        console.log('Data saved successfully:', response.data);
        // Reset form data
        setFormData({
          course: '',
          courseId: '',
          description: '',
          category: '',
          trainingContent: '',
          certificate: '',
          file: '',
          credits: '',
          creditVisibility: false,
          dropClass: false,
          activityReview: false,
          enrollmentID: '',
          hours: '',
          minutes: '',
        });
        // Optionally, you can handle any other logic such as switching tabs
      })
      .catch((error) => {
        alert('Classroom not Data saved');
        console.error('Error saving classroom data:', error);
        // Handle error as needed
      });
  };
  return (
    <CContainer>
    <h1>Classroom</h1>
    <CContainer>
    <CNav variant="tabs">
            <CNavItem>
              <CNavLink
                href="#"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Activities
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Add Course image
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Notifications
              </CNavLink>
            </CNavItem>

          </CNav>

    <CTabContent>
      <CTabPane visible={activeKey === 1}>
      <CContainer>
  <form >
    <CContainer className='container'>
      <CContainer className='tab-content-container'>
        <CContainer className='section'>
          <label htmlFor="course">Course : </label>
          <CFormInput type="course" id="course" floatingClassName="mb-3" floatingLabel="" placeholder="M.C.A" onChange={e => setFormData({...formData, course: e.target.value})} required />
        </CContainer>
        <CContainer className='section'>
          <label htmlFor="courseId">Course -Id : </label>
          <CFormInput type="courseId" id="courseId" floatingClassName="mb-3" floatingLabel="" placeholder="GU000" onChange={e => setFormData({...formData, courseId: e.target.value})} required />
        </CContainer>
        <CContainer className="section">
          
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Enter-text here"
            rows={3}
       
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
        </CContainer>
        <CContainer className='section'>
          <label htmlFor="category">Categories :</label>
          <CFormSelect onChange={e => setFormData({...formData, category: e.target.value})} required>
            <option value="">Select categories</option>
            <option value="CC1">CC1</option>
            <option value="CC2">CC2</option>
            <option value="CC3">CC3</option>
          </CFormSelect>
        </CContainer>
        <CContainer className="section">
          <label htmlFor="trainingContent">Training content :</label>
          <CFormSelect onChange={e => setFormData({...formData, trainingContent: e.target.value})} required>
            <option value="">Select training content</option>
            <option value="CRT1">CRT1</option>
            <option value="CRT2">CRT2</option>
            <option value="CRT3">CRT3</option>
          </CFormSelect>
        </CContainer>
        <CContainer className="section">
          <label htmlFor="certificate">Certificate :</label>
          <CFormSelect onChange={e => setFormData({...formData, certificate: e.target.value})} required>
            <option value="">Select certificate</option>
            <option value="CeCR1">CeCR1</option>
            <option value="CeCR2">CeCR2</option>
            <option value="CeCR3">CeCR3</option>
          </CFormSelect>
        </CContainer>
        <CContainer className="section">
          <label htmlFor="hours">Total time :</label>
          <CInputGroup>
            <CInputGroupText>Hours and minutes</CInputGroupText>
            <CFormInput type="number" aria-label="Hours" onChange={e => setFormData({...formData, hours: e.target.value})} required />
            <CFormInput type="number" aria-label="Minutes" onChange={e => setFormData({...formData, minutes: e.target.value})} required />
          </CInputGroup>
        </CContainer>
        <CContainer className="section">
          <label htmlFor="credits">Credits :</label>
          <CFormInput type="number" id="credits" floatingClassName="mb-3" floatingLabel="" placeholder="" onChange={e => setFormData({...formData, credits: e.target.value})} required />
        </CContainer>



        <CContainer className="section" style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
          <CFormSwitch label="Credit Visibility" id="formSwitchCheckDefault" onChange={handleCreditVisibilityChange} checked={formData.creditVisibility}  />
        
          <CFormSwitch label="Drop class" id="formSwitchCheckDefault" onChange={handledropClassChange} checked={formData.dropClass}  />
          <CFormSwitch label="Activity-Review" id="formSwitchCheckDefault" onChange={handleActivityChange} checked={formData.activityReview}  />
        </CContainer>



        <CContainer className="section">
          <label htmlFor="enrollmentID">Enrollment :</label>
          <CFormInput type="text" id="enrollmentID" floatingClassName="mb-3" floatingLabel="" placeholder="" onChange={e => setFormData({...formData, enrollmentID: e.target.value})} required />
        </CContainer>
        <CContainer className="section" style={{display:'flex', justifyContent:'center'}}>
        </CContainer>
      </CContainer>
    </CContainer>

    <div className="btn-space">
      <CButton onClick={handleSubmit} type='submit' color="primary">Next</CButton>
    </div>
  </form>
</CContainer>



        
      </CTabPane>
      <CTabPane visible={activeKey === 2}>
        <DragandDrop />
        <UploadMedia />
      </CTabPane>
      <CTabPane visible={activeKey === 3}>
        <div className='not-main'>
          <div>
        <UserNotifications />

          </div>
          <div>

        <AdminNotifications />
          </div>
          <div>

        <SuprevisorNotifications />
          </div>

        </div>
      </CTabPane>
    </CTabContent>
    </CContainer>
      
    </CContainer>

  )
}

export default Classroom
