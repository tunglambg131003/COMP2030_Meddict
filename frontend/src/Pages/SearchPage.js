import React from "react";
import SearchBar from "../Components/SearchBar";
import ExNavbar from "../Components/ExternalNavBar";
import Footer from "../Components/Footer";
import {useState, useEffect} from "react";
import "../Styles/ScrollUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleUp } from "@fortawesome/free-solid-svg-icons";

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
        <ExNavbar />
        <SearchBar />
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
