import React, { useState, useEffect, useContext } from "react";
import apiClient from "../axios";
import PatientProfile from "../components/PatientProfile";
import DoctorProfile from "../components/DoctorProfile";
import { Context } from "../main";

const Profile = () => {

  const { user } = useContext(Context);
  const role = user?.role; // Safely access `role`

  // useEffect(() => {
  //   // Only fetch data if `role` is defined
  //   if (!role) return;

  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null); // Clear previous errors before a new request
  //       const endpoint =
  //         role === "patient" ? "/api/v1/patient/profile" : "/api/v1/doctor/profile";
  //       const response = await apiClient.get(endpoint);
  //       setProfileData(response.data.data);
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Failed to fetch profile data. Please try again."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, [role]);

  // Show loading if data is being fetched or `role` is not yet availabl
  // Render appropriate profile based on role
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
       {role === "doctor" ? (
        <DoctorProfile user={user} />
      ) : role === "patient" ? (
        <PatientProfile user={user} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
