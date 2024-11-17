import React, { useState } from "react";
import axios from "axios";

const DoctorProfile = ({ doctor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put("/api/doctor/profile", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Doctor Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {isEditing ? (
          <>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Consultation Fees"
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
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Fees:</strong> ${doctor.fees}</p>
            <p><strong>Years of Experience:</strong> {doctor.years_of_experience}</p>
            <p><strong>Available Time Slots:</strong></p>
            <ul>
              {doctor.available_time_slots.map((slot, index) => (
                <li key={index}>{slot.day}: {slot.time}</li>
              ))}
            </ul>
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

export default DoctorProfile;
