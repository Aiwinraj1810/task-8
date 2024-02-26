// In Home.js component
import { Link } from "react-router-dom";
import { CContainer } from "@coreui/react";
import '../styles/homePage.css'

const Home = () => {
   
    return (
      <CContainer  className="body">

        <CContainer className="main-header">
        <h1>Welcome</h1>
        </CContainer>
      <CContainer className="main-wrapper">
        <CContainer className="main-section">

        <Link style={{textDecoration:'none'}} to='/elearning'>
        <CContainer className="main-grid">
          <p>E-learning</p>
        </CContainer>
          </Link>
        <Link style={{textDecoration:'none'}} to='/classroom'>
        <CContainer className="main-grid">
          <p>Classroom</p>
        </CContainer>
          </Link>
        <Link style={{textDecoration:'none'}} to='/assesment'>
        <CContainer className="main-grid">
          <p>Assessment</p>
        </CContainer>
          </Link>
        </CContainer>
      </CContainer>
      </CContainer>
   
    );
  }

export default Home;
