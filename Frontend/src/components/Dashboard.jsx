


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
import SearchFilter from "./SearchFilter";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

const Dashboard = () => {
  const { user } = useContext(Context);
  const { role } = user; 
  console.log("Role:", role);
  return (
    <div className="dashboard">
      {/* Conditional rendering based on role */}
      {role === "doctor" ? (
        <DoctorDashboard user={user} />
      ) : role === "patient" ? (
        <PatientDashboard user={user} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

