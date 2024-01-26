import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "../Components/SolutionStep";
import "../Styles/About.css";
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation();

  return (
      <div className="about-section" id="about">
        <div className="about-image-content">
          <img src={Doctor} alt="Doctor Group" className="about-image1" />
        </div>

        <div className="about-text-content">
          <h3 className="about-title">
            <span>{t("About us")}</span>
          </h3>
          <p className="about-description">
            {t("Welcome")}  </p>

          <h4 className="about-text-title">{t("Advantages")}</h4>

          <SolutionStep
              title={t("a-1")}
              description={t("a-1-1")}
          />

          <SolutionStep
              title={t("a-2")}
              description={t("a-2-1")}
          />

          <SolutionStep
              title={t("a-3")}
              description={t("a-3-1")}
          />
        </div>

      </div>

  );
}

export default About;
