import React, { useEffect, useState } from "react";
import axios from "axios";

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/patients/blood-sugar").then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      {patients.map((patient) => (
        <div key={patient._id}>
          <p>{patient.name}</p>
          <p>Blood Sugar: {patient.treatmentRecords.map((record) => record.bloodSugar.join(", "))}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;// JavaScript Document