


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
  const { role, name, date_of_birth, profile_pic } = user; // Assuming these fields exist in the `user` object

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Age calculation (if date_of_birth exists)
  const age = date_of_birth ? calculateAge(date_of_birth) : "N/A";

  return (
    <div className="dashboard">
      <div className="profile-section">
        {/* Profile Image */}
        <img
          src={profile_pic || "https://via.placeholder.com/150"} // Placeholder image if profile_pic is unavailable
          alt={`${name}'s profile`}
          className="profile-pic"
          style={{ borderRadius: "50%", width: "100px", height: "100px" }}
        />
        
        {/* User Information */}
        <div className="user-info">
          <h2>{name}</h2>
          <p>Age: {age}</p>
          <p>Role: {role === "doctor" ? "Doctor" : "Patient"}</p>
        </div>
      </div>

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

