import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/patients").then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {patients.map((patient) => (
        <div key={patient._id}>
          <img src={patient.photo} alt={patient.name} width="50" />
          <p>{patient.name} - {patient.age} years</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;// JavaScript Document