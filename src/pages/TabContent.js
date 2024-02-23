import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CFormSwitch, CButton } from '@coreui/react';
import Forms from './Forms';
import TextBox from './TextBox';
import AddContent from './AddContent';
import ContentDetails from './ContentDetails';
const [addContentTab, setAddContentTab] = useState(1);
const TabContent = () => {
  return (
    <div>
      <CTabContent>
      <CTabPane visible={activeKey === 1}>
        <div className='tab-content'>
          {/* Pass formInput as a prop to the Forms component */}
          <Forms 
            formInput={{
              email: <CFormInput type="email" id="email" floatingClassName="mb-3" floatingLabel="Email address" placeholder="name@example.com" />,
              password: <CFormInput type="password" id="password" floatingClassName="mb-3" floatingLabel="Password" placeholder="Password" />,
              textArea: <TextBox />,
              categories : 
              <CFormSelect>
              <option>Select categories</option>
                <option >Small</option>
                <option >Medium</option>
                <option >Large</option>
              </CFormSelect>,
              training_content:
              <CFormSelect>
              <option>Select categories</option>
                <option >Small</option>
                <option >Medium</option>
                <option >Large</option>
              </CFormSelect>,
              certificates:
              <CFormSelect>
              <option>Select categories</option>
                <option >Small</option>
                <option >Medium</option>
                <option >Large</option>
              </CFormSelect>,
              fileUpload:
              <CFormInput 
              type="file" 
              size="sm" 
              id="formFileSm" 
              label="Small file input example"
              accept=".jpg, .jpeg, .png, .pdf" // Restrict file types
            onChange={handleFileChange} 
               />,
               credits:
               <CFormInput type="text" id="text" floatingClassName="mb-3" floatingLabel="Credits" placeholder="" />,
               score:
               <CFormInput type="text" id="text" floatingClassName="mb-3" floatingLabel="Score" placeholder="" />,
               timeData:
               <CInputGroup>
                    <CInputGroupText>Hours and minutes</CInputGroupText>
                    <CFormInput aria-label="Hours" />
                    <CFormInput aria-label="Minutes" />
                </CInputGroup>,
                creditVisibility:
                <CFormSwitch label="creditVisibility" id="formSwitchCheckDefault"/>,
                scoreVisibility:
                <CFormSwitch label=" scoreVisibility" id="formSwitchCheckDefault"/>,
                nextButton:
                <CButton color="primary">Next</CButton>,
            }}
          />
        </div>
      </CTabPane>
      <CTabPane visible={activeKey === 2}>
          <CNav variant='tabs'>
          <CNavItem>
          <CNavLink
            href="#"
            active={activeKey === 1}
            onClick={() => setAddContentTab(1)}
          >
            Upload media
          </CNavLink>
        </CNavItem>
          <CNavItem>
          <CNavLink
            href="#"
            active={activeKey === 1}
            onClick={() => setAddContentTab(2)}
          >
            Add media from list 
          </CNavLink>
        </CNavItem>
          </CNav>
          {/* Content for "Add content" tab */}
          <CTabContent>
            <CTabPane visible={addContentTab === 1}>
              {/* Content for "Upload media" tab */}
              <div className="sub-tab-content">
              <AddContent />
              </div>
            </CTabPane>
            <CTabPane visible={addContentTab === 2}>
              {/* Content for "Select from list" tab */}
              <div className="sub-tab-content-2">
              <ContentDetails />
              </div>
            </CTabPane>
          </CTabContent>
        </CTabPane>
        <CTabPane visible={activeKey === 3}>
          <div>
            {/* Content for Link tab */}
            This is the content for the Link tab.
          </div>
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default TabContent
