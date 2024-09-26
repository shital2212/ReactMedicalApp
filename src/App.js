import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import DoctorManagement from './Components/SearchDoctors';
import PatientManagement from './Components/SearchPatient';
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      
      <div className="App">
      
      <nav>
      <Link to="/">Home</Link> | 
      <Link to="/doctor">Doctor</Link> |
      <Link to="/patient">Patient</Link>      
      </nav>
      <Outlet/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/patient" element={ <PatientManagement/>}/>
        <Route path="/doctor" element={<DoctorManagement/>}/>
        
      </Routes>
    </div>
    </div>
  );
}

export default App;
