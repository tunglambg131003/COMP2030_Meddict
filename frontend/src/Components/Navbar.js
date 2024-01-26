import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,

} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../Assets/CHS_Logo.png"
import LanguageSelector from "../Components/LanguageSelector"
import { useTranslation } from 'react-i18next'

function Navbar(props) {
  const [nav, setNav] = useState(false);
  const { t } = useTranslation();

  const openNav = () => {
    setNav(!nav);
  };

  return (
      <div className="navbar-section" >
        <h1 className="navbar-title">
          <Link to="/" className="navbar-sign" onclick="reloadPage()">
            <img src = {Logo} alt ="Header-logo" />
          </Link>
        </h1>

        {/* Desktop */}
        <ul className ="navbar-items" id="mainNav">

          <li >
            <Link to="/" className = "navbar-links">
              {t("Home")}
            </Link>
          </li>
          <li >
            <Link to="/searchpage" className = "navbar-links">
              {t("search")}
            </Link>
          </li>
          <li>
            <a href="#about" className="navbar-links" >
              {t("About")}
            </a>
          </li>
          <li>
            <a href="#contact" className="navbar-links" >
              {t("Contact")}
            </a>
          </li>


          <li>

            <LanguageSelector/>
          </li>
        </ul>

        {/* Mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar-close">
            <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
          </div>

          <ul className="mobile-navbar-links" id = "mainNav_mobile">
            <li>
              <Link onClick={openNav} to="/">
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/searchpage">
                {t("search")}
              </Link>
            </li>
            <li>
              <a onClick={openNav} href="#about">
                {t("About")}
              </a>
            </li>
            <li>
              <a onClick={openNav} href="#contact">
                {t("Contact")}
              </a>
            </li>
            <li>

              <LanguageSelector/>
            </li>

          </ul>


        </div>


        {/* Hamburger Icon */}
        <div className="mobile-nav">
          <FontAwesomeIcon
              icon={faBars}
              onClick={openNav}
              className="hamb-icon"
          />

        </div>
      </div>
  );
}

export default Navbar;
