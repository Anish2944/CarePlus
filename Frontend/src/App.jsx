
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
const App = () => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching data from app......")
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/user/current-user`,
          {
            withCredentials: true,
          }
        );
        console.log("Response",response);
        setIsAuthenticated(true);
        setUser(response.data.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

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
