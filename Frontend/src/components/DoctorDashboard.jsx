import React from "react";

const DoctorDashboard = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline" >Welcome, Dr. {user.name}</h1>
      <div>
        <h2>Upcoming Appointments</h2>
        {/* Fetch and display appointments linked to the doctor */}
      </div>
      <div>
        <h2>Patient Records</h2>
        {/* Link to patient medical records */}
      </div>
      <div>
        <h2>Feedback</h2>
        {/* Display feedback associated with the doctor */}
      </div>
    </div>
  );
};

export default DoctorDashboard;
