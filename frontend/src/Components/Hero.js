import React, { useEffect, useState } from "react";
import Doctor from "../Assets/LDP.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";
import { useTranslation } from 'react-i18next'

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/searchpage");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <h2 className="text-title">
            {t("H1")}          </h2>
          <p className="text-descritpion">
            {t("H2")}
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faSearch} /> {t("H3")}
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>50,000+</p>
              <p>{t("H4")}</p>
            </div>

            <div className="text-stats-container">
              <p>5,000+</p>
              <p>{t("H5")}</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>{t("H6")}</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
