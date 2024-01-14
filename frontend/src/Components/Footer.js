import React from "react";
import "../Styles/Footer.css";
import Footer_Logo from "../Assets/Footer_Logo.png"
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

export function FooterText({text}) {
  return <span>{text}</span>;
}

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footer-col1">
            <Link to = "/" onClick="reload">
            <img src = {Footer_Logo}  alt = "Footer_Logo"/> 
            </Link>
        </div>

        <div className="ft-list">
          <p className="ft-list-title">{t("School")}</p>
          <ul className="ft-list-items">
            <li>
              <a href="https://vinuni.edu.vn/college-of-arts-and-sciences/">{t("CAS")}</a>
            </li>
            <li>
              <a href="https://vinuni.edu.vn/college-of-business-management/">{t("CBM")}</a>
            </li>
            <li>
              <a href="https://vinuni.edu.vn/college-of-engineering-computer-science/">{t("CECS")}</a>
            </li>
            <li>
              <a href="https://vinuni.edu.vn/college-of-health-sciences/">{t("CHS")}</a>
            </li>

          </ul>
        </div>

        <div className="ft-list">
          <p className="ft-list-title">{t("FAQ")}</p>
          <ul className="ft-list-items">
            <li>
              <Link to={"https://vinuni.edu.vn/contact/"}>{t("Contact us")} </Link>
            </li>
            <li>
              <Link to={"https://library.vinuni.edu.vn/"}>{t("Library")}</Link>
            </li>
            <li>
              <Link to={"https://vinuni.edu.vn/visit/"}>{t("Campus map")}</Link>
            </li>
            
            
          </ul>
        </div>

        <div className="ft-list" id="contact">
          <p className="ft-list-title">{t("Administrations")}</p>
          <ul className="ft-list-items">
            
            <li>
              <a href="mailto:chien.hd@vinuni.edu.vn">
                chien.hd@vinuni.edu.vn
              </a>
            </li>
            <li>
              <a href="mailto:duy.hm@vinuni.edu.vn">
                duy.hm@vinuni.edu.vn</a>
            </li>
            <li>
              <a href="tel:+84 9035 80518">+84 9035 80518 </a>
            </li>
            <li>
              <a href="tel:+84 9617 171592">+84 9617 17159</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-copyright">
        <p> <FooterText text =  "Copyright © 2019 VinUni. All right reserved.  " />

        <a href = "https://vinuni.edu.vn/privacy-statement/">
          <FooterText text = "Privacy Policy" /> 
        </a></p>
        <div class="col-4 col-md-3 social-link-wrapper">
          
        <ul className="ft-social-links">
          <li>
            <a
              href="https://www.facebook.com/vinuniversity/"
              title="FaceBook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF/>
            </a>
          </li>

          <li>
            <a
              href="https://www.youtube.com/channel/UC-XZodYpSIIogum4QqbENAA"
              title="Youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
            <FaYoutube/>
            </a>
          </li>

          <li>
            <a
              href="mailto:admission@vinuni.edu.vn"
              title="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope/>
            </a>
          </li>

        </ul>
        

        </div>

      </div>
    </div>
  );
}

export default Footer;
