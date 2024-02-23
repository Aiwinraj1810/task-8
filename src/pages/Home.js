// In Home.js component
import { Link } from "react-router-dom";
import '../styles/homePage.css'
const Home = () => {
   
    return (
      <div className="body">

        <div className="main-header">
        <h1>Welcome</h1>
        </div>
      <div className="main-wrapper">
        <div className="main-section">

        <Link style={{textDecoration:'none'}} to='/elearning'>
        <div className="main-grid">
          <p>E-learning</p>
        </div>
          </Link>
        <Link style={{textDecoration:'none'}} to='/classroom'>
        <div className="main-grid">
          <p>Classroom</p>
        </div>
          </Link>
        <Link style={{textDecoration:'none'}} to='/assesment'>
        <div className="main-grid">
          <p>Assessment</p>
        </div>
          </Link>
        </div>
      </div>
      </div>
    );
  }

export default Home;
