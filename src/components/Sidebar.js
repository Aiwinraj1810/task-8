import React from 'react'
import { CSidebar, CSidebarNav, CNavItem,CNavTitle,CNavGroup,CSidebarToggler, CSidebarBrand, CBadge} from '@coreui/react'

const Sidebar = () => {
  return (
    <div>
      <CSidebar>
  <CSidebarBrand>Sidebar Brand</CSidebarBrand>
  <CSidebarNav>
    <CNavTitle>Nav Title</CNavTitle>
    <CNavItem href="#">
      
      Nav item
    </CNavItem>
    <CNavItem href="#">
      
      With badge
      <CBadge color="primary ms-auto">NEW</CBadge>
    </CNavItem>
    <CNavGroup toggler="Nav dropdown">
      <CNavItem href="#">
       
      </CNavItem>
      <CNavItem href="#">
       
      </CNavItem>
    </CNavGroup>
  </CSidebarNav>
  <CSidebarToggler />
</CSidebar>
    </div>
  )
}

export default Sidebar
