import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const departmentsArray = [
  { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
  { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
  { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
  { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
  { name: "Oncology", imageUrl: "/departments/onco.jpg" },
  { name: "Radiology", imageUrl: "/departments/radio.jpg",},
  { name: "Physical Therapy",imageUrl: "/departments/therapy.jpg",},
  { name: "Dermatology",imageUrl: "/departments/derma.jpg", },
  { name: "ENT",imageUrl: "/departments/ent.jpg",},
];

const Departments = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section className="departments">
      <h2>Our Departments</h2>
      <Carousel responsive={responsive}>
        {departmentsArray.map((dept, index) => (
          <div key={index} className="department-card">
            <img src={dept.imageUrl} alt={dept.name} />
            <h3>{dept.name}</h3>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Departments;
