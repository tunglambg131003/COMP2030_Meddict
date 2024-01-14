import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact"
import NotFound from "./Pages/NotFound";
import About from "./Pages/About"
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./Styles/ScrollUp.css"
import Login from "./Pages/LogIn"

function App() {
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

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);
  
  return (
    <div className="App">
      <Router >
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Login/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </Router>
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
    
  );
}

export default App;
