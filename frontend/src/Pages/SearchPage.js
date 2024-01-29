import React from "react";
import SearchBar from "../Components/SearchBar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {useState, useEffect} from "react";
import "../Styles/ScrollUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleUp } from "@fortawesome/free-solid-svg-icons";
import About from "../Components/About";
import Contact from "../Components/Contact";


function SearchPage() {
    const [goUp, setGoUp] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const onPageScroll = () => {
            if (window.scrollY > 100) {
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


  return(
      <div>
        <Navbar />
        <SearchBar />
        <About/>
        <Contact/>
          <Footer />
          <div
              onClick={scrollToTop}
              className={`scroll-up ${goUp ? "show-scroll" : ""}`}
          >
              <FontAwesomeIcon icon={faAngleUp} />
          </div>
      </div>
      );
}

export default SearchPage;
