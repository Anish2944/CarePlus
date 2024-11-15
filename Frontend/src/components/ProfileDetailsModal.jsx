// src/components/ProfileDetailsModal.js
import React from "react";
import "../App.css";

const ProfileDetailsModal = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={profile.photo} alt={profile.name} className="modal-photo" />
        <h3>{profile.name}</h3>
        {/* <p><strong>Role:</strong> {profile.specialty || "Patient"}</p> */}
        <p><strong>Experience:</strong> {profile.experience || profile.age + " years"}</p>
        <p><strong>Condition:</strong> {profile.condition || "N/A"}</p>
        <p><strong>Last Visit:</strong> {profile.lastVisit || "N/A"}</p>
        <p><strong>Contact:</strong> {profile.contact}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileDetailsModal;
