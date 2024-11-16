
import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import { backendURL } from "./constant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

    useEffect(() => {
      const fetchUser = async () => {
        console.log("Fetching data from app...");
    
        try {
          // Retrieve accessToken from localStorage
          const accessToken = localStorage.getItem("accessToken");
    
          if (!accessToken) {
            throw new Error("Access token not found");
          }
    
          // Set accessToken in document.cookie if it's missing
          const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [name, value] = cookie.split("=");
            acc[name] = value;
            return acc;
          }, {});
    
          if (!cookies["accessToken"]) {
            document.cookie = `accessToken=${accessToken}; path=/;`;
          }
    
          // Make API request with accessToken
          const response = await axios.get(`${backendURL}/api/v1/user/current-user`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true, // Ensures cookies are sent
          });
    
          console.log("Response", response);
          setIsAuthenticated(true);
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
    
          // Check if the error is due to an expired token
          if (error.response && error.response.status === 401) {
            console.warn("Token expired. Removing accessToken...");
            
            // Remove token from localStorage and document.cookie
            localStorage.removeItem("accessToken");
            document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
            setIsAuthenticated(false);
            setUser({});
          }
        }
      };
    
      fetchUser();
    }, []);
    

  return (
    <>
      <Router>
        <Navbar />
        <div className="hscreen">
        <Routes>
          {/* <div className="App"><Dashboard /></div> */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/patient" element={<Profile userType="patient" />} />
          <Route path="/profile/doctor" element={<Profile userType="doctor" />} />
        </Routes>
        </div>
        
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
