import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../Assets/CHS_Logo.png"

function Navbar(props) {
  const [nav, setNav] = useState(false);

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
      
        <li>
          <Link to="/" className = "navbar-links"> 
            Home
          </Link>
        </li>
        <li>
          <a href="/contact" className="navbar-links" >
            Contact
          </a>
        </li>
        <li>
          <Link  to="/about" className="navbar-links" >
            About us
          </Link>
        </li>
        <li>
          <a href="/signin" className= "navbar-links">
            Sign in 
          </a>
        </li>
        
      </ul>
      
      <div class="select-dropdown" >
        <select>
        <option value="en" >English</option>
        <option value="vi">Vietnamese</option>
        </select>
      </div>
      
      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links" id = "mainNav_mobile">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="/contact">
              Contact
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/about">
              About us
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/signin">
              Sign in 
            </a>
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
