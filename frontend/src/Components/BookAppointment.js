import React from "react";
import Doctor from "../Assets/LDP1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/BookAppointment.css";
import { useTranslation } from 'react-i18next'


function BookAppointment() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBookAppointmentClick = () => {
    window.scrollTo(0, 0);
    navigate("/searchpage");
  };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>{t("B1")} </span>
        </h3>
        <p className="ba-description">
          {t("B2")}
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5288" }} /> {t("B3")}
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5288" }} /> {t("B4")}
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5288" }} /> {t("B5")}
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5288" }} /> {t("B6")}
        </p>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faSearch} /> {t("H3")}
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
