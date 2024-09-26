import React, { useState, useEffect } from 'react';
import '../App.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const DoctorManagement = () => {
  // State to keep track of doctors count
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
 
  const handleChange = (e) => {
    setName(e.target.value);
  };
 
  const setDoctorData = () => {
    axios.get(`http://localhost:8001/api/doctors`)
      .then(response => {
        console.log(response);
        setDoctor(response.data);
      })
      .catch(error => {
        //alert("Error occurred!" + error);
        console.log("Error occurred!" + error);
      });
  };

  useEffect(() => {   
      setDoctorData();
    
  }, []);
 
  return (
    
    <div>            
    <>
    <h3>List of Users:</h3>
    <table class="myOtherTable">
        <thead border="1">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>specialty</th>
            <th>hospitalAffiliation</th>
            <th>contactPhone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            doctor &&
            doctor.map((doc, index) => (
              <tr key={doc.id}>
                <th scope="row" >{doc.id}</th>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>   
                <td>{doc.hospitalAffiliation}</td>
                <td>{doc.contactPhone}</td>
                <td >
                <button className="btn btn-primary"> Edit </button>
                <button className="btn btn-primary"> Delete </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
    </>
</div>
  );
};
 
export default DoctorManagement;