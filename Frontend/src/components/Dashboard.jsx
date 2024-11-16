


// // src/components/Dashboard.js
// import React, { useState } from "react";
// import DoctorProfile from "./DoctorProfile";
// import PatientProfile from "./PatientProfile";
// import ProfileDetailsModal from "./ProfileDetailsModal";
// import SearchFilter from "./SearchFilter";
// import { doctors, patients } from "../data/profilesData";
// import "../App.css";

// const Dashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   const filteredDoctors = doctors.filter(
//     (doctor) =>
//       doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (!filterType || doctor.specialty.includes(filterType))
//   );

//   const filteredPatients = patients.filter(
//     (patient) =>
//       patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (!filterType || patient.condition.includes(filterType))
//   );

//   return (
//     <div className="dashboard-container">
//       <h2>Profile Dashboard</h2>
//       <SearchFilter
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         filterType={filterType}
//         setFilterType={setFilterType}
//       />

//       <h3>Doctors</h3>
//       <div className="profile-grid">
//         {filteredDoctors.map((doctor) => (
//           <DoctorProfile key={doctor.id} doctor={doctor} onClick={() => setSelectedProfile(doctor)} />
//         ))}
//       </div>

//       <h3>Patients</h3>
//       <div className="profile-grid">
//         {filteredPatients.map((patient) => (
//           <PatientProfile key={patient.id} patient={patient} onClick={() => setSelectedProfile(patient)} />
//         ))}
//       </div>

//       <ProfileDetailsModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../main";

const Dashboard = () => {
  // Assuming `user` contains role information
  const { user } = useContext(Context)
  const { role } = user; // role can be 'doctor' or 'patient'

  return (
    <div className="dashboard">
      <h1>Welcome, {role === "doctor" ? "Doctor" : "Patient"}</h1>
      
      {/* Conditional rendering based on role */}
      {role === "doctor" ? (
        <DoctorDashboard />
      ) : role === "patient" ? (
        <PatientDashboard />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const DoctorDashboard = () => (
  <div>
    <h2>Doctor's Dashboard</h2>
    <ul>
      <li>View Appointments</li>
      <li>Patient Records</li>
      <li>AI Consultation Insights</li>
    </ul>
    {/* Quick Access Panels */}
    <div className="quick-access">
      <h3>Upcoming Appointments</h3>
      <h3>Unread Notifications</h3>
    </div>
  </div>
);

const PatientDashboard = () => (
  <div>
    <h2>Patient's Dashboard</h2>
    <ul>
      <li>Book Appointment</li>
      <li>View Medical Records</li>
      <li>AI Consultation</li>
      <li>Notifications</li>
    </ul>
    {/* Quick Access Panels */}
    <div className="quick-access">
      <h3>Upcoming Appointments</h3>
      <h3>Recent Prescriptions</h3>
      <button>Quick AI Consultation</button>
    </div>
  </div>
);

export default Dashboard;
