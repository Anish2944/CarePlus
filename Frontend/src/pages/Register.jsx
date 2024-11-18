import apiClient from "../axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

const handleRegistration = async (e) => {
  e.preventDefault();
  try {
    const response = await apiClient.post("/api/v1/user/register", {
      name,
      email,
      phoneNumber,
      role,
      password,  
    });
    if (response.status === 200) {
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      setUser(response.data.data.user);
      toast.success("Registration successful");
      navigateTo("/login");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(`Registration Error: ${errorMessage}`);
  }
}

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
        Thank you for joining us! You’re just a few steps away from smarter, easier healthcare management.
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
         <select
             value={role}
             onChange={(e) => setRole(e.target.value)}
          >
          <option value="" disabled>
             Select Role
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;