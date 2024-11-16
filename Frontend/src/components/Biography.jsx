import React from "react";

function Biography () {
  let message = ' We are a team of innovative computer science students developing a Smart Healthcare System to improve patient care.'
  return (
    <section className= "section-whit">
      <div className= "container">
        <div className="row">

          <div className="coll-md-12 text center">
            <h1 className="section-title">
              OUR TEAM

            </h1>
            <p className="section-subtitle">{message}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
             <img src="/jitendra1.jpg" className="team-img" alt="pic" />
             <h2>Jitendra Kumar Verma</h2>
             <h3>Frontend Developer</h3> 
             <div className="team-info">
              <p>Jitendra focuses on creating an intuitive and responsive user interface, leveraging his expertise in front-end technologies to ensure a seamless user experience.</p>
              <ul className="team-icon">
                <li><a href="#" className="Twitter">
                <i className="fa-fa-twitter"></i>
                </a></li>
                <li><a href="#" className="Facebook">
                <i className="fa-fa-facebook"></i>
                </a></li>
                <li><a href="#" className="instagram">
                <i className="fa-fa-instagram"></i>
                </a></li>
              </ul>
             </div>

            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
             <img src="/anish1.jpg" className="team-img" alt="pic" />
             <h2>Anish Kushwaha</h2>
             <h3>Backend Developer</h3> 
             <div className="team-info">
              <p>Ansih is responsible for server-side logic, handling data management, and ensuring smooth communication between frontend and backend..</p>
              <ul className="team-icon">
                <li><a href="#" className="Twitter">
                <i className="fa-fa-twitter"></i>
                </a></li>
                <li><a href="#" className="Facebook">
                <i className="fa-fa-facebook"></i>
                </a></li>
                <li><a href="#" className="instagram"><span>instagram</span>
                <i className="fa-fa-instagram"></i>
                </a></li>
              </ul>
             </div>

            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
             <img src="/vidit1.jpg" className="team-img" alt="pic" />
             <h2>Vidit Rajpal</h2>
             <h3>UI/UX Designer</h3> 
             <div className="team-info">
              <p>Vidit designs a user-friendly interface that complements the functionality of the application</p>
              <ul className="team-icon">
                <li><a href="#" className="Twitter">
                <i className="fa-fa-twitter"></i>
                </a></li>
                <li><a href="#" className="Facebook">
                <i className="fa-fa-facebook"></i>
                </a></li>
                <li><a href="#" className="instagram">
                <i className="fa-fa-instagram"></i>
                </a></li>
              </ul>
             </div>

            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
             <img src="/shubh1.jpg" className="team-img" alt="pic" />
             <h2>Shubham Yadav</h2>
             <h3>Quality Assurance and Testing</h3> 
             <div className="team-info">
              <p>Shubham coordinates testing and quality assurance to ensure the product meets the highest standards.</p>
              <ul className="team-icon">
                <li><a href="#" className="Twitter">
                <i className="fa-fa-twitter"></i>
                </a></li>
                <li><a href="#" className="Facebook">
                <i className="fa-fa-facebook"></i>
                </a></li>
                <li><a href="#" className="instagram">
                <i className="fa-fa-instagram"></i>
                </a></li>
              </ul>
             </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )

}
export default Biography;
