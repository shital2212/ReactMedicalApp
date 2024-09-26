import React, {useState, useEffect} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const PatientManagement=()=>  {
  const navigate= useNavigate();
   
    const[availableDoctorPatients, setAvailableDoctorPatients]= useState([]);
    const[availableDoctor, setAvailableDoctor]= useState("");
    const[patientId,setPatientId]=useState("");
    const[patientName,setPatientName]=useState("");
    const[patientAge,setPatientAge]=useState("");
    const[patientEmergencyContact,setPatientEmergencyContact]=useState("");
    const[patientDoctorId, setPatientDoctorId]= useState("");
    const[edit, setEdit]=useState(false);
    const [doctor, setDoctor] = useState([]);
    
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
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
    const getAvailableDoctorPatients =()=>{
      console.log("availableDoctor:", availableDoctor);
      axios.get(`http://localhost:8000/api/patients/doctor/${availableDoctor}`, config)       
      .then(response => {     
         //console.log("host2:",host);
         console.log(response)
         setAvailableDoctorPatients(response.data)
       })
       .catch(error =>{
          // alert("Error occured!"+ error);
          console.log("Error occured!"+ error);
       })
    }
    const handleChangeAvaibleDoctor = (e) => {
        setAvailableDoctor(e.target.value);
        
      };
    const handleAddPatient=(e)=>{
      e.preventDefault();
      console.log(e.target.value);
      if(edit)
      {//edit starts...
        console.log("edit the data");
        console.log("Complete object to pass: "+patientId+" "+patientName+" "+patientAge+" "+patientEmergencyContact+" "+patientDoctorId);      
       // const id=availableDoctorPatients[index].id;
        axios.put(`http://localhost:8000/api/patients/`+patientId,{id:patientId,name:patientName, age:patientAge, emergencyContactPhone:patientEmergencyContact,doctorId:patientDoctorId} )
        .then((response)=>{
        console.log(response);
        alert("Patient update done!");
        getAvailableDoctorPatients();
      })
      .catch(error=>{
        alert("Error occured while updating an existing record: "+ error)
      })
      setPatientId("");
    setPatientName("");
    setPatientAge("");
    setPatientEmergencyContact("");
    setPatientDoctorId("");
        setEdit(false);

      }
      else{
       
      console.log(patientId+" "+patientName+" "+patientAge+" "+patientEmergencyContact+" "+patientDoctorId);      
      axios.post(`http://localhost:8000/api/patients`,{id:patientId,name:patientName, age:patientAge, emergencyContactPhone:patientEmergencyContact,doctorId:patientDoctorId}, {headers: {'Content-Type': 'application/json', 
      }})    
      .then((response)=>{
        console.log(response);
        getAvailableDoctorPatients();
      })
      .catch(error=>{
        alert("Error occured while creating a new record: "+ error)
      })
    }//add completed
    
    }
    const editThePatientData=(index)=>{

    }
   useEffect(()=>{
       //setPatientData();
       getAvailableDoctorPatients();
   },[availableDoctor]);

   const handleEditPatient=(e,index)=>{
    e.preventDefault();
    setEdit(true);
   
    console.log("index:"+index+" availableDoctorPatient:",availableDoctorPatients[index]);
    const { name, value } = e.target;
    //setPatientData({ ...availableDoctorPatients[index], [name]: value });
    //console.log(patientData.id+" "+patientData.name+" "+patientData.age+" "+patientData.emergencyContactPhone+" "+patientData.doctorId);
    setPatientId(availableDoctorPatients[index].id);
    setPatientName(availableDoctorPatients[index].name);
    setPatientAge(availableDoctorPatients[index].age);
    setPatientEmergencyContact(availableDoctorPatients[index].emergencyContactPhone);
    setPatientDoctorId(availableDoctorPatients[index].doctorId);
    console.log(patientId+" "+patientName+" "+patientAge+" "+patientEmergencyContact+" "+patientDoctorId);
    
    
   }
   const handleDeletePatient=(e,index)=>{
    e.preventDefault();
    console.log(availableDoctorPatients[index]);
    const id = availableDoctorPatients[index].id;
    console.log("id:"+id);
    //setPatientData(availableDoctorPatients[index]);
    //console.log(patientData);
    axios.delete(`http://localhost:8000/api/patients/`+id)
    .then(response =>{
      getAvailableDoctorPatients();
    })
    .catch(error =>{
        alert("Error occured while deleting a record: "+error)
    })
}
    return (
      <div className="container text-left">
        <form>
        <div className="form-group">
          <h2 style={{textAlign:'left'}}>Available Doctors</h2>
          <table class="myOtherTable">
        <thead>
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
                <button className="btn btn-primary" > Edit </button>
                <button className="btn btn-primary"> Delete </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
        </div>
        
        <div className="form-group">
        <label for="searchPatientsByDoctor" style={{textAlign:'left'}}>Search Patients by Doctor Name:</label>
        <input type="text" name="availableDoctor" value={availableDoctor} onChange={handleChangeAvaibleDoctor} id="searchPatientsByDoctor" placeholder="Enter doctor's name" className="form-control" />
        <br/>
        </div>
         
         <h2 style={{textAlign:'left'}}>List of All the Patients:</h2>
             <table class="myOtherTable">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>EmergencyContactPhone</th>
                    <th>DoctorId</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    availableDoctorPatients &&
                    availableDoctorPatients.map((dp, index) => (
                      <tr key={dp.id}>
                        <th scope="row" >{dp.id}</th>
                        <td>{dp.name}</td>
                        <td>{dp.age}</td>
                        <td>{dp.emergencyContactPhone}</td>
                        <td>{dp.doctorId}</td>
                        <td >             
                          <button className="btn btn-primary" onClick={(e)=>handleEditPatient(e,index)}>Edit Patient</button>
                          <button className="btn btn-primary" onClick={(e)=>handleDeletePatient(e,index)}>Delete Patient</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
          <br/>

          <h2 style={{textAlign:'left'}}>Add/Edit Patient</h2>
          <div className="form-group">
            <input type="number" name="id" onChange={(e)=>setPatientId(e.target.value)} value={patientId} id="patientId" className="form-control" placeholder="Enter patient's Id" />
          </div>
          <div className="form-group">
            <input type="text" name="name" onChange={(e)=>setPatientName(e.target.value)} value={patientName} id="patientName" className="form-control" placeholder="Enter patient's name" />
          </div>
          <div className="form-group">
            <input type="number" name="patientAge" onChange={(e)=>setPatientAge(e.target.value)} value={patientAge} id="patientAge" className="form-control" placeholder="Enter patient's age" />
          </div>
          <div className="form-group">
            <input type="tel" name="patientEmergencyContact" onChange={(e)=>setPatientEmergencyContact(e.target.value)} value={patientEmergencyContact} id="patientEmergencyContact" className="form-control" placeholder="Enter emergency contact number" />
          </div>
          <div className="form-group">
            <input type="number" name="patientDoctorId" onChange={(e)=>setPatientDoctorId(e.target.value)} value={patientDoctorId} id="patientDoctorId" className="form-control" placeholder="Enter patients Doctor-Id" />
          </div>
          <button className="btn btn-primary" onClick={handleAddPatient}> 
            {edit ? 'Edit Patient' : 'Add Patient'}</button>
        </form>
      </div>
    );
  }


export default PatientManagement;
