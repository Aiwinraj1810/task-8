import './App.css';
import Elearning from './pages/Elearning';
import Home from './pages/Home';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Routes, Route } from 'react-router-dom';
import Classroom from './pages/Classroom';
import Assesment from './pages/Assesment';
import AddContent from './components/AddContent';
import { CContainer } from '@coreui/react';

function App() {
  return (
    <CContainer style={{margin:0, padding:0}}>
        <Routes>

          <Route 
            path='/' element={<Home />}
          />

          <Route 
            path='/elearning' element={<Elearning />}
          />
          <Route 
            path='/classroom' element={<Classroom />}
          />
          <Route 
            path='/assesment' element={<Assesment />}
          />
          <Route 
            path='/addContent' element={<AddContent />}
          />
        </Routes>

       
    </CContainer>
  );
}

export default App;
