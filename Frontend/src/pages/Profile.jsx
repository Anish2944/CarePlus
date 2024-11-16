import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientProfile from "../components/PatientProfile";
import DoctorProfile from "../components/DoctorProfile";

const Profile = ({ userType }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const endpoint =
          userType === "patient" ? "/api/patient/profile" : "/api/doctor/profile";
        const response = await axios.get(endpoint, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies/session are sent
        });
        setProfileData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch profile data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userType]);

  if (loading) {
    return <div className="text-center py-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {userType === "patient" && profileData ? (
        <PatientProfile patient={profileData} />
      ) : userType === "doctor" && profileData ? (
        <DoctorProfile doctor={profileData} />
      ) : (
        <div className="text-center py-6">No profile data available.</div>
      )}
    </div>
  );
};

export default Profile;
