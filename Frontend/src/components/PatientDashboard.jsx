import React, { useEffect, useState } from "react";
import apiClient from "../axios";

const PatientDashboard = ({ user }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState({});

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.date_of_birth);

  // Fetch medical records and appointments
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch patient profile first
            const patientResponse = await apiClient.get(`/api/v1/patient/profile`);
            const patient = patientResponse.data.data;
            console.log("Patient:", patient);
            setPatient(patient)
          
            // Fetch medical records and appointments concurrently
            // const [medicalRecordsResponse, appointmentsResponse] = await Promise.all([
            //   apiClient.get(`/api/v1/patient/medical-records/${user._id}`),
            //   apiClient.get(`/api/v1/patient/appointments/${user._id}`),
            // ]);
          
            // const medicalRecords = medicalRecordsResponse.data.records;
            // const appointments = appointmentsResponse.data.appointments;
            // setAppointments(appointments)
            // setMedicalRecords(medicalRecords)
            // Use patient, medicalRecords, and appointments in your logic
            // console.log("Medical Records:", medicalRecords);
            // console.log("Appointments:", appointments);
          } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
          }
        };          

    fetchData();
  }, [user.id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Patient Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center space-x-6">
        <img
          src={patient.profileImage || "https://via.placeholder.com/150"}
          alt={`${user.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Welcome, {user.name}</h1>
          <p className="text-gray-600">Age: {age}</p>
        </div>
      </div>

      {/* Appointments Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.timeSlot}
                </p>
                <p>
                  <strong>Doctor:</strong> {appointment.doctorName || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Get Appointment
        </button>
      </div> */}

      {/* Medical Records Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Medical Records</h2>
        {medicalRecords.length > 0 ? (
          <ul className="space-y-4">
            {medicalRecords.map((record) => (
              <li
                key={record.id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
              >
                <p>
                  <strong>Diagnosis:</strong> {record.diagnosis}
                </p>
                <p>
                  <strong>Treatment:</strong> {record.treatment}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(record.record_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No medical records found.</p>
        )}
      </div> */}
    </div>
  );
};

export default PatientDashboard;
