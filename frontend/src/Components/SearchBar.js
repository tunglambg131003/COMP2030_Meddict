import React from "react";
import glass from "../Assets/glass.png"
import mic from "../Assets/mic.png"
import cam from "../Assets/cam.png"
import "../Styles/MeddictSearchBar.css"


function SearchBar() {
  
  return(
  <div class="layout">
  <div class="meddict-title">
    MEDICAL DICTIONARY
  </div>

  <div class="meddict-search">
    <label class="label">
      <img src={glass} class="search-icon" alt="Search Icon" type = "submit"/>
      <input type="text" placeholder="Search for the antidote to curiosity..."></input>
      <img src={mic} class="mic-icon" alt="Microphone Icon"/>
      <img src={cam} class="cam-icon" alt="Camera Icon"/>
    </label>
  </div>

  <button class="search-button" type = "submit">
    Search
  </button>

</div>
)
}

export default SearchBar;
