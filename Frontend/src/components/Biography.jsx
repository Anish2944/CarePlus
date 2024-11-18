// import React from "react";

// function Biography () {
//   let message = ' We are a team of innovative computer science students developing a Smart Healthcare System to improve patient care.'
//   return (
//     <section className= "section-whit">
//       <div className= "container">
//         <div className="row">

//           <div className="coll-md-12 text center">
//             <h1 className="section-title">
//               OUR TEAM

//             </h1>
//             <p className="section-subtitle">{message}</p>
//           </div>
//           <div className="col-sm-6 col-md-4">
//             <div className="team-item">
//              <img src="/jitendra1.jpg" className="team-img" alt="pic" />
//              <h2>Jitendra Kumar Verma</h2>
//              <h3>Frontend Developer</h3> 
//              <div className="team-info">
//               <p>Jitendra focuses on creating an intuitive and responsive user interface, leveraging his expertise in front-end technologies to ensure a seamless user experience.</p>
//               <ul className="team-icon">
//   <li>
//     <a href="#" className="twitter">
//       <i className="fa fa-Twitter"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="facebook">
//       <i className="fa fa-Facebook"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="instagram">
//       <i className="fa fa-Instagram"></i>
//     </a>
//   </li>
// </ul>
//              </div>

//             </div>
//           </div>
//           <div className="col-sm-6 col-md-4">
//             <div className="team-item">
//              <img src="/anish1.jpg" className="team-img" alt="pic" />
//              <h2>Anish Kushwaha</h2>
//              <h3>Backend Developer</h3> 
//              <div className="team-info">
//               <p>Ansih is responsible for server-side logic, handling data management, and ensuring smooth communication between frontend and backend..</p>
//               <ul className="team-icon">
//               <li>
//         <a href="#" className="twitter">
//           <FontAwesomeIcon icon={faTwitter} />
//         </a>
//       </li>
//       <li>
//         <a href="#" className="facebook">
//           <FontAwesomeIcon icon={faFacebook} />
//         </a>
//       </li>
//       <li>
//         <a href="#" className="instagram">
//           <FontAwesomeIcon icon={faInstagram} />
//         </a>
//       </li>
// </ul>

//              </div>

//             </div>
//           </div>
//           <div className="col-sm-6 col-md-4">
//             <div className="team-item">
//              <img src="/vidit1.jpg" className="team-img" alt="pic" />
//              <h2>Vidit Rajpal</h2>
//              <h3>UI/UX Designer</h3> 
//              <div className="team-info">
//               <p>Vidit designs a user-friendly interface that complements the functionality of the application</p>
//               <ul className="team-icon">
//   <li>
//     <a href="#" className="twitter">
//       <i className="fa fa-twitter"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="facebook">
//       <i className="fa fa-facebook"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="instagram">
//       <i className="fa fa-instagram"></i>
//     </a>
//   </li>
// </ul>
//              </div>

//             </div>
//           </div>
//           <div className="col-sm-6 col-md-4">
//             <div className="team-item">
//              <img src="/shubh1.jpg" className="team-img" alt="pic" />
//              <h2>Shubham Yadav</h2>
//              <h3>Quality Assurance and Testing</h3> 
//              <div className="team-info">
//               <p>Shubham coordinates testing and quality assurance to ensure the product meets the highest standards.</p>
//               <ul className="team-icon">
//   <li>
//     <a href="#" className="twitter">
//       <i className="fa fa-twitter"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="facebook">
//       <i className="fa fa-facebook"></i>
//     </a>
//   </li>
//   <li>
//     <a href="#" className="instagram">
//       <i className="fa fa-instagram"></i>
//     </a>
//   </li>
// </ul>
//              </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )

// }
// export default Biography;
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Reusable SocialMediaLinks Component
const SocialMediaLinks = () => (
  <ul className="team-icon">
    <li>
      <a href="#" className="twitter">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </li>
    <li>
      <a href="#" className="facebook">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
    </li>
    <li>
      <a href="#" className="instagram">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </li>
  </ul>
);

function Biography() {
  const message = 'We are a team of innovative computer science students developing a Smart Healthcare System to improve patient care.';
  
  // Team Member Data
  const teamMembers = [
    {
      name: "Jitendra Kumar Verma",
      role: "Frontend Developer",
      image: "/jitendra1.jpg",
      description: "Jitendra focuses on creating an intuitive and responsive user interface, leveraging his expertise in front-end technologies to ensure a seamless user experience."
    },
    {
      name: "Anish Kushwaha",
      role: "Backend Developer",
      image: "/anish1.jpg",
      description: "Anish is responsible for server-side logic, handling data management, and ensuring smooth communication between frontend and backend."
    },
    {
      name: "Vidit Rajpal",
      role: "UI/UX Designer",
      image: "/vidit1.jpg",
      description: "Vidit designs a user-friendly interface that complements the functionality of the application."
    },
    {
      name: "Shubham Yadav",
      role: "Quality Assurance and Testing",
      image: "/shubh1.jpg",
      description: "Shubham coordinates testing and quality assurance to ensure the product meets the highest standards."
    }
  ];

  return (
    <section className="section-whit">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="section-title">OUR TEAM</h1>
            <p className="section-subtitle">{message}</p>
          </div>

          {teamMembers.map((member, index) => (
            <div key={index} className="col-sm-6 col-md-4">
              <div className="team-item">
                <img src={member.image} className="team-img" alt={member.name} />
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <div className="team-info">
                  <p>{member.description}</p>
                  <SocialMediaLinks />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Biography;
