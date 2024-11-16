import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response received:", response);
  
      toast.success(response.data.message);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", response.data.data.accessToken)
      setUser(response.data.data.user)
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error occurred:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(`Login Error: ${errorMessage}`);
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Welcome back! We're excited to see you again. Dive in to manage your healthcare with ease and stay on top of your wellness journey.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
 