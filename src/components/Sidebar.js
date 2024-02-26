import React from 'react'
import { CSidebar, CSidebarNav, CNavItem,CNavTitle,CNavGroup,CSidebarToggler, CSidebarBrand, CBadge, CSidebarFooter, CContainer} from '@coreui/react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div style={{margin:0,padding:0}}>
      <CSidebar>
        
  <CSidebarBrand><Link style={{textDecoration:'none', color:'white', cursor:'pointer'}} to='/'>Learning library</Link></CSidebarBrand>
  <CSidebarNav>
    <CNavTitle>Menu</CNavTitle>
    <CContainer style={{display:'flex', flexDirection:'column', justifyContent:'space-between',height:'100lvh'}}>

    <CContainer style={{display:'flex', flexDirection:'column'}}>
    <Link Link style={{textDecoration:'none'}} to='/elearning'>
    <CNavItem href="#">
      
      E-learn
    </CNavItem>
    </Link>
    <Link Link style={{textDecoration:'none'}} to='/classroom'>
    <CNavItem href="#">
      
      Classroom
    </CNavItem>
    </Link>
    <Link Link style={{textDecoration:'none'}} to='/assesment'>
    <CNavItem href="#">
      
      Assesment
    </CNavItem>
    </Link>
    </CContainer>

    <CContainer style={{display:'flex', flexDirection:'column'}}>

    <CNavItem href="#">
      Copyrights
    </CNavItem>
    </CContainer>
    </CContainer>
  </CSidebarNav>
  <CSidebarToggler />
</CSidebar>
    </div>
  )
}

export default Sidebar
