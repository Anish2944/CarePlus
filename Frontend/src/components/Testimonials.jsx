// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Anjali Mehra",
    feedback: "The services provided were exceptional. The booking process was simple, and the staff was very supportive.",
    image: "/assets/testimonials/anjali.jpg"
  },
  {
    name: "Ravi Sharma",
    feedback: "A seamless healthcare experience! The doctors and staff were professional, and I felt well cared for.",
    image: "/assets/testimonials/ravi.jpg"
  },
  {
    name: "Priya Kapoor",
    feedback: "Highly recommend! The online booking system is intuitive, and the team is very responsive.",
    image: "/assets/testimonials/priya.jpg"
  }
];

const Testimonials = () => (
  <section className="testimonials container">
    <h2>What Our Patients Say</h2>
    <div className="testimonial-cards">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial-card">
          <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
          <h3>{testimonial.name}</h3>
          <p>"{testimonial.feedback}"</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
