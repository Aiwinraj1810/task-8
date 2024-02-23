import React from 'react'
import { CModal,  CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton  } from '@coreui/react'
const Modal = ( ) => {
  return (
    <div>
      <CModal>
  <CModalHeader>
    <CModalTitle>React Modal title</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <p>React Modal body text goes here.</p>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary">Close</CButton>
    <CButton color="primary">Save changes</CButton>
  </CModalFooter>
</CModal>
    </div>
  )
}

export default Modal
