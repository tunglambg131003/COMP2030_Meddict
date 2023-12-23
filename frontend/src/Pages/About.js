import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "../Components/SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
        Welcome to VinUni Medical Dictionary, a vital compendium demystifying healthcare language. Its meticulously crafted definitions, catering to students, practitioners, and the intellectually curious, facilitate a nuanced understanding of medical science. Unravel the tapestry of medical knowledge and empower yourself with essential linguistic tools for navigating the labyrinth of health and healing.        </p>

        <h4 className="about-text-title">Your Advantages</h4>

        <SolutionStep
          title="Professional Development"
          description="Facilitates ongoing professional development by learning the latest medical terminology, procedures, and advancements in the medical field."
        />

        <SolutionStep
          title="Quick Reference"
          description="Serves as a quick reference, allowing people to look up unfamiliar terms on the spot, saving time and promoting accuracy."
        />

        <SolutionStep
          title="Accurate Documentation"
          description="Assists in accurately documenting information, medical histories, and treatment plans, contributing to comprehensive and precise medical records."
        />
      </div>
      
    </div>
    
  );
}

export default About;
