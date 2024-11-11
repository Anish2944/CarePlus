import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content container">
      <div className="footer-section about">
        <img src="/logo.png" alt="Healthcare Logo" className="logo-img" />
        <p>
          Smart Healthcare System is dedicated to providing quality healthcare services, focusing on patient experience and innovative solutions.
        </p>
        <div className="socials">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
      <div className="footer-section services">
        <h4>Our Services</h4>
        <ul>
          <li><Link to="/departments">Departments</Link></li>
          <li><Link to="/appointment">Book Appointment</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </div>
      <div className="footer-section contact">
        <h4>Contact Us</h4>
        <p><FaPhone /> +91 9560789815</p>
        <p><MdEmail /> smartcare@gmail.com</p>
        <p><FaMapMarkerAlt /> Lucknow, India</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Smart Healthcare System. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
