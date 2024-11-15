import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
        <img src="/whoweare.png" alt="whoweare" />

        </div>
        <div className="banner">
          <p><u>Biography</u></p>
          <h3>Who We Are</h3>
          <p>
           Our team is a dedicated group of four computer science students who bring a diverse set of skills to the table, working together to create an innovative
           Smart Healthcare System. Each team member has a specialized role:
          </p>
          <li><b>Jitendra Kumar Verma – Frontend Developer</b></li>
          <p>
          Frontend Developer. Jitendra focuses on creating an intuitive and responsive user interface, leveraging his expertise in front-end technologies to ensure a
          seamless user experience.
          </p>
          <li><b>Ansih Kushwaha – Backend Developer</b></li>
          <p>
            Backend Developer. Ansih is responsible for the server-side logic, handling data management, and ensuring smooth communication between the frontend and
            backend.
          </p>
          <li><b>Vidit Rajpal – UI/UX Designer</b></li>
          <p>
            Vidit takes charge of the visual aspects, creating a user-friendly design that complements the functionality of the application.
          </p>
          <li><b>Shubham Yadav – Quality Assurance and Testing</b></li>
          <p>
            Collaborator in overall project coordination and testing, ensuring the product meets the highest standards.
          </p>
          <p><i>We are working on a MERN STACK PROJECT.</i></p>
          <p><b> We are all in 2024!</b></p>
        </div>
      </div>
    </>
  );
};

export default Biography;