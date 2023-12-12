import React from "react";
import DoctorCard from "../Components/DoctorCard";
import Chien from "../Assets/Prof.Chien.jpeg"
import Duy from "../Assets/Mr.Duy.jpeg"
import "../Styles/Contact.css";

function Contact() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Experts</span>
        </h3>

        <p className="dt-description">
        Meet our exceptional team of specialist doctors, dedicated to providing top-notch medical terms at Medical Dictionary. Trust in their knowledge and experience to lead you towards a horizon. 
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={Chien}
          name="Prof. Huynh Dinh Chien"
          phone="+ 84 9035 80518"
          mail = "chien.hd@vinuni.edu.vn"
  
        />
        
        <DoctorCard
          img={Duy}
          name="Mr. Hoang Mai Duy"
          phone="+ 84 9617 171592"
          mail ="duy.hm@vinuni.edu.vn"
          
        />
      </div>
    </div>
  );
}

export default Contact;
