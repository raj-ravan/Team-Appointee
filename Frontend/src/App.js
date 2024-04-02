import './component/Home.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './component/Home.jsx';
import Login from "./component/Login";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import Register from "./component/Register.jsx";
import Appointment from './component/Appointment';
import Patient_form from './component/Patient_form';
import Otp_page from './component/Otp_page';
import History from './component/History';
import Navbar from'./component/Navbar.js';
import ResetPassword from './component/resetpassword';

function App() {
  
  return (
    <BrowserRouter>
        
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/Appointment' element={<Appointment/>} />
          <Route path='/Patient_form' element={<Patient_form/>} />
          <Route path='/Otp_page' element={<Otp_page/>} />
         <Route path='/History' element={<History/>}/>
         <Route path='/resetpassword' element={<ResetPassword/>}/>
        

        </Routes>
    </BrowserRouter>
  );
}

export default App;
