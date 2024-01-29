import React from "react";
import DoctorCard from "../Components/DoctorCard";
import Chien from "../Assets/Prof.Chien.jpeg"
import Duy from "../Assets/Mr.Duy.jpeg"
import "../Styles/Contact.css";
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation();
  return (
      <div className="doctor-section" id="contact">
        <div className="dt-title-content">
          <h3 className="dt-title">
            <span>{t("Experts")}</span>
          </h3>

          <p className="dt-description">
            {t("Description")} </p>
        </div>

        <div className="dt-cards-content">
          <DoctorCard
              img={Chien}
              name="Dr. Huynh Dinh Chien"
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
