import React from "react";
import InformationCard from "./InformationCard";
import { faBookMedical, faClinicMedical , faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";
import { useTranslation } from 'react-i18next'


function Info() {
  const { t } = useTranslation();

  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span> {t("I1")} </span>
        </h3>
        <p className="info-description">
          {t("I2")}
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title={t("I3-1")}
          description={t("I3")}
          icon={faBookMedical}
        />

        <InformationCard
          title={t("I4-1")}
          description={t("I4")}
          icon={faClinicMedical}
        />

        <InformationCard
          title={t("I5-1")}
          description={t("I5")}
          extend = {t("I5-2")}
          icon={faCloudDownloadAlt }
        />
      </div>
    </div>
  );
}

export default Info;
