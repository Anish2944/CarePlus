import React, { useState } from "react";
import apiClient from "../axios";

const PatientProfile = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(patient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("Patient Data:", patient);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await apiClient.patch("/api/v1/patient/update", formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Patient Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {isEditing ? (
          <>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
              placeholder="Medical History"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleSave}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><strong>Date of Birth:</strong> {new Date(patient.date_of_birth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Address:</strong> {patient.address || "N/A"}</p>
            <p><strong>Blood Group:</strong> {patient.blood_group || "N/A"}</p>
            <p><strong>Medical History:</strong> {patient.medical_history || "N/A"}</p>
            <p><strong>Emergency Contact:</strong> {patient.emergency_contact || "N/A"}</p>
            <p><strong>Insurance Details:</strong> {patient.insurance_details || "N/A"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
