import React, { useContext, useEffect, useState } from "react";
import apiClient from "../axios";
import { Context } from "../main";

const DoctorProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const { isAuthenticated } = useContext(Context);
  const { _id } = user;

  // Determine if the current logged-in user is the owner of the profile
  const isOwner = isAuthenticated && _id === formData.user_id?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/v1/doctor/profile");
        setFormData(response.data.data);
        setProfileImage(response.data.data.profileImage || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch profile only if authenticated
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);

    // Generate preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes
  const handleSave = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("specialization", formData.specialization);
      formDataToSend.append("fees", formData.fees);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("qualification", formData.qualification);


      const response = await apiClient.patch("/api/v1/doctor/update", formDataToSend);
      setFormData(response.data.data);
      setProfileImage(response.data.data.profileImage || "");
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update profile image only
  const handleProfileImageUpdate = async () => {
    if (!newProfileImage) {
      setError("Please select an image before updating.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profileImage", newProfileImage);
  
    try {
      setLoading(true);
      const response = await apiClient.patch("/api/v1/doctor/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setProfileImage(response.data.data.profileImage); // Update the profile image in the state
      alert("Profile image updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile image.");
    } finally {
      setLoading(false);
    }
  };
  

  // Profile creation form for new users
  const renderProfileForm = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Create/Edit Your Profile</h2>
      <div>
        <label className="block font-medium mb-2">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization || ""}
          onChange={handleChange}
          placeholder="Enter specialization"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Consultation Fees</label>
        <input
          type="number"
          name="fees"
          value={formData.fees || ""}
          onChange={handleChange}
          placeholder="Enter fees"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Experience (Years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience || ""}
          onChange={handleChange}
          placeholder="Enter years of experience"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Qualification</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification || ""}
          onChange={handleChange}
          placeholder="Enter your qualification"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );

  // Profile view/edit form for existing profiles
  const renderProfile = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Profile</h2>
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
      ) : (
        <p className="text-gray-500">No profile image available</p>
      )}
      {isOwner && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Update Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleProfileImageUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Update Image
          </button>
        </div>
      )}
      <p><strong>Name:</strong> {formData.user_id?.name || "N/A"}</p>
      <p><strong>Specialization:</strong> {formData.specialization || "N/A"}</p>
      <p><strong>Consultation Fees:</strong> ₹{formData.fees || "N/A"}</p>
      <p><strong>Years of Experience:</strong> {formData.experience || "N/A"} years</p>
      <p><strong>Qualification:</strong> {formData.qualification || "N/A"}</p>
      <p><strong>Available Time Slots:</strong></p>
      <ul>
        {formData.available_time_slots?.map((slot, index) => (
          <li key={index} className="ml-4">
            <strong>{slot.day}:</strong> {slot.times.map((t) => t.time).join(", ")}
          </li>
        )) || <p>No time slots available</p>}
      </ul>
      {isOwner && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}
      {isOwner && isEditing && renderProfileForm()}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!formData.user_id ? renderProfileForm() : renderProfile()}
    </div>
  );
};

export default DoctorProfile;
