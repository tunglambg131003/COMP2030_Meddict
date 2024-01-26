import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InformationCard(props) {
  return (
    <div className="info-cards">
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span>
      <p className="info-card-title">{props.title}</p>
      <p className="info-card-description">{props.description}</p>
        <a className="info-card-description" href = "https://chromewebstore.google.com/detail/meddict-highlighter/kgmbhgimmclibmgocggfjkjdojlkfcmd?fbclid=IwAR0EpQIDcyiiovstvDrK1fb1hxUAjjBtdkEgdKWsvT3S3XQ-zrMv0zUWFiY">{props.extend}</a>
    </div>
  );
}

export default InformationCard;
