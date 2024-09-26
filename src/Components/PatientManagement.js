import React, { useState, useEffect } from 'react';
 
const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    emergencyContact: '',
    phoneno: ''
  });
 
  useEffect(() => {
    // Fetch initial patient data from the API
    fetch('/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };
 
  const handleAddPatient = () => {
    if (editingIndex !== null) {
      // Update existing patient
      fetch(`/api/patients/${patients[editingIndex].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      })
        .then(response => response.json())
        .then(updatedPatient => {
          const updatedPatients = patients.map((patient, index) =>
            index === editingIndex ? updatedPatient : patient
          );
          setPatients(updatedPatients);
          setEditingIndex(null);
        })
        .catch(error => console.error('Error updating patient:', error));
    } else {
      // Add new patient
      fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      })
        .then(response => response.json())
        .then(newPatient => {
          setPatients([...patients, newPatient]);
        })
        .catch(error => console.error('Error adding patient:', error));
    }
    setPatientData({ name: '', age: '', emergencyContact: '', phoneno: '' });
  };
 
  const handleEditPatient = (index) => {
    setEditingIndex(index);
    setPatientData(patients[index]);//set the values temp in an object
  };
 
  return (
    <div className="container text-left">
      <form>
        <h2 style={{ textAlign: 'left' }}>Search Patients</h2>
        <div>
          <label htmlFor="searchPatients" style={{ textAlign: 'left' }}>
            Search Patients by Doctor Name:
          </label>
          <input
            type="text"
            name="search"
            id="searchPatients"
            placeholder="Enter doctor's name"
            className="form-control"
          />
          <button className="btn btn-primary mt-2">Search</button>
        </div>
 
        <h2 style={{ textAlign: 'left' }}>Available Doctors</h2>
        <div className="form-group">
          <select className="form-control dropdown-triangle" id="availableDoctors">
            <option>Dr. Smith</option>
            <option>Dr. Johnson</option>
            <option>Dr. Williams</option>
            <option>Dr. Brown</option>
          </select>
        </div>
 
        <h2 style={{ textAlign: 'left' }}>Patient List</h2>
        <ul>
          {patients.map((patient, index) => (
            <li key={index}>
              {patient.name} - {patient.age} - {patient.emergencyContact} - {patient.phoneno}
              <button onClick={() => handleEditPatient(index)} className="btn btn-secondary ml-2">
                Edit
              </button>
            </li>
          ))}
        </ul>
 
        <h2 style={{ textAlign: 'left' }}>Add/Edit Patient</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="patientName"
            className="form-control"
            placeholder="Enter patient's name"
            value={patientData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="age"
            id="patientAge"
            className="form-control"
            placeholder="Enter patient's age"
            value={patientData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="emergencyContact"
            id="emergencyContact"
            className="form-control"
            placeholder="Enter emergency contact number"
            value={patientData.emergencyContact}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phoneno"
            id="phoneno"
            className="form-control"
            placeholder="0"
            value={patientData.phoneno}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleAddPatient} className="btn btn-primary">
          {editingIndex !== null ? 'Save Patient' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};
 
export default PatientManagement;
 