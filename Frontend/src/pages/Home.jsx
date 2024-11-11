import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";

const Home = () => (
  <>
    <Hero
      title="Welcome to Smart Healthcare"
      subtitle="Your health, our priority. Experience the next level of healthcare services."
      imageUrl="/hero.png"
    />
    <Departments />
    <Biography />
    <Testimonials />
    <ContactForm />
  </>
);

export default Home;
