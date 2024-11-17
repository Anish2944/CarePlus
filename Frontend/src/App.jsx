
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
import apiClient from "./axios";
import { Context } from "./main";
const App = () => {

  const { setIsAuthenticated, setUser, user } =
    useContext(Context);
    // console.log("USER: ",user);

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        apiClient
          .get("/api/v1/user/current-user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            setIsAuthenticated(true);
            setUser(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }, [setIsAuthenticated, setUser]);
    

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
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </div>
        
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
