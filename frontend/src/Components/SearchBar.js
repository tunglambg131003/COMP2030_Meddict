// MedDictionaryComponent.js
import React, { useState, useEffect, useRef } from 'react';
import "../Styles/MeddictSearchBar.css"

import glass from "../Assets/glass.png"
import sound from "../Assets/sound.png"

const SearchBar = () => {

  const [imageUrl, setImageUrl] = useState(''); // State variable for storing the image URL
  const [audioUrl, setAudioUrl] = useState('');
  const [audioUrl_res, setAudioUrl_res] = useState('');
  const typingTimerRef = useRef(null);
  const showTimeRef = useRef(null);

  
  useEffect(() => {
    const searchButton = document.getElementById('searchButton');
    const suggestionBox = document.getElementById('suggestionBox');
    let selectedSuggestionIndex = -1;
    const searchInput = document.getElementById('searchInput');  
    const doneTypingInterval = 1000; // Adjust this interval as needed
    
    const inputEventListener = function () {
      clearTimeout(typingTimerRef.current);
      const inputValue = searchInput.value.trim();

      
      typingTimerRef.current = setTimeout(async () => {
        const suggestionBox = document.getElementById('suggestionBox');

        if (inputValue.length === 0) {
          suggestionBox.style.display = 'none';
          resetSearchInputStyle();
          return;
        }

        try {
          const response = await fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue));
          const userData = await response.json();
          const filteredSuggestions = userData
        .filter(user => user.en.toLowerCase().startsWith(inputValue.toLowerCase()))
        .map(user => user.en);
    
          console.log(filteredSuggestions);
          displaySuggestions(filteredSuggestions);
          suggestionBox.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
          adjustSearchInputStyle(filteredSuggestions.length > 0);
        } catch (error) {
          // Handle errors
          console.error('Error fetching suggestions:', error);
        }
      }, doneTypingInterval);

    };

    searchInput.addEventListener('input', inputEventListener);

    
  
    // Section 7: Style Adjustment Functions
    function adjustSearchInputStyle(hasSuggestions) {
      if (hasSuggestions) {
        searchInput.style.borderRadius = '22px 22px 0 0';
      } else {
        searchInput.style.borderRadius = '22px';
      }
    }
  
    function resetSearchInputStyle() {
      searchInput.style.borderRadius = '22px';
    }
  
    // Section 8: Keyboard Events
    searchInput.addEventListener('keydown', function (event) {
      const suggestions = document.querySelectorAll('.suggestions .suggestion');
      const suggestionBox = document.getElementById('suggestionBox');

      if (event.key === 'ArrowUp') {
        if (selectedSuggestionIndex > 0) {
          selectedSuggestionIndex--;
        } else {
          // If at the first suggestion, loop to the last one
          selectedSuggestionIndex = suggestions.length - 1;
        }
      } else if (event.key === 'ArrowDown') {
        if (selectedSuggestionIndex < suggestions.length - 1) {
          selectedSuggestionIndex++;
        } else {
          // If at the last suggestion, loop to the first one
          selectedSuggestionIndex = 0;
        }
      } 
      else if (event.key === 'Enter') {
        event.preventDefault();
  
        if (selectedSuggestionIndex !== -1) {
          // If a suggestion is selected, use it
          searchInput.value = suggestions[selectedSuggestionIndex].textContent;

        }
  
        // Trigger the search
        performSearch();
      }

      else if (event.key === "Backspace"){
        suggestionBox.style.display = 'none';
        resetSearchInputStyle();
        selectedSuggestionIndex = -1;
        searchInput.value = null; 
        return; 
       }


      highlightSelectedSuggestion();
    });
  
    // Section 9: Hide Suggestions Box on Click Outside
    document.addEventListener('click', async function (event) {
      const suggestionBox = document.getElementById('suggestionBox');

      if (!searchInput.contains(event.target) && !suggestionBox.contains(event.target)) {
        suggestionBox.style.display = 'none';
        resetSearchInputStyle();
        selectedSuggestionIndex = -1;
      }

    });
  
    // Section 10: Highlight Selected Suggestion
    async function highlightSelectedSuggestion() {
      const suggestions = document.querySelectorAll('.suggestions .suggestion');
      await suggestions.forEach((suggestion, index) => {
        if (index === selectedSuggestionIndex) {
          suggestion.classList.add('selected');
          // Update the input value with the selected suggestion
          searchInput.value = suggestion.textContent;
        } else {
          suggestion.classList.remove('selected');
        }
      });
    }
    
    
  
    // Section 11: Display Suggestions Function
    async function displaySuggestions(filteredSuggestions) {
      const suggestionBox = document.getElementById('suggestionBox');
      suggestionBox.innerHTML = '';

      for (let index = 0; index < filteredSuggestions.length && index < 10; index++) {
        const suggestion = filteredSuggestions[index];

        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion');
        suggestionItem.textContent = suggestion;
    
        suggestionItem.addEventListener('click', function () {
          searchInput.value = suggestion
          suggestionBox.style.display = 'none';
          resetSearchInputStyle();
        });
    
        suggestionBox.appendChild(suggestionItem);
      }
    }
  
    // Section 12: Click Event Listener for Search Button
    searchButton.addEventListener('click', function () {
      performSearch();
      
    });
  
    // Section 13: Perform Search Function
    async function performSearch() {
      const inputValue = searchInput.value.trim();
      const resultContainer = document.getElementById('resultContainer');
      const inputCard = document.getElementById('inputCard');
      const resultCard = document.getElementById('resultCard');
      const interval = 1000; 
      setImageUrl(null);
      if (inputValue !== null) {
        clearTimeout(showTimeRef.current)
        showTimeRef.current = setTimeout(() => {fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue))
        .then(async (response) => {
          const userData = response.json();
          return userData;
        })
        .then(async (userData) => {
          const matchingUser = userData.find(user => user.en.toLowerCase() === inputValue.toLowerCase());
          return matchingUser;
        })
       
        .then(async(matchingUser) => {resultContainer.classList.remove('show');
        inputCard.classList.remove('show');
        resultCard.classList.remove('show');

        if (matchingUser) {
          // Section 13.3: Display the input in the upper card
          inputCard.innerHTML = `${inputValue}`;

          // Section 13.4: Display the result in the lower card
          resultCard.innerHTML = `${matchingUser.vn}`;

          // Show the result box smoothly
          resultContainer.classList.add('show');

          // Show the result cards smoothly
          inputCard.classList.add('show');
          resultCard.classList.add('show');
        } else {
          // Section 13.5: If no matching user is found
          inputCard.innerHTML = `${inputValue}`;
          resultCard.innerHTML = `No translation found for: ${inputValue}`;

          // Show the result box smoothly
          resultContainer.classList.add('show');

          // Show the result cards smoothly
          inputCard.classList.add('show');
          resultCard.classList.add('show');
        }
        
        fetch(encodeURI('https://api.meddict-vinuni.com/words/illustration/' + matchingUser.id))
          .then(response => response.blob())
          .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            console.log(imageUrl);
            setImageUrl(imageUrl);
          });


        
        fetch(encodeURI('https://api.meddict-vinuni.com/words/sound/en/' + matchingUser.id))
          .then((response) => response.blob())
          .then((blob) => {
            const audioUrl = URL.createObjectURL(blob);
            console.log(audioUrl);
            setAudioUrl(audioUrl);
          });

          fetch(encodeURI('https://api.meddict-vinuni.com/words/sound/vn/' + matchingUser.id))
          .then((response) => response.blob())
          .then((blob) => {
            const audioUrl_res = URL.createObjectURL(blob);
            console.log(audioUrl_res);
            setAudioUrl_res(audioUrl_res);
          });
          
       
        // Scroll into view
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })}, interval)

        
          // Section 13.1: Fetch user data from the provided URL
          // Section 13.2: Find the user with the matching name
            // const matchingUser = userData.find(user => user.en.toLowerCase() === inputValue.toLowerCase());
        
          // Remove 'show' class to enable smooth transition for subsequent searches
          
        
      }
      suggestionBox.style.display = 'none';
      resetSearchInputStyle();
      selectedSuggestionIndex = -1;

    }
    
  });

  function playAudio() {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }

  function playAudio_res() {
    if (audioUrl_res) {
      const audio = new Audio(audioUrl_res);
      audio.play();
    }
  }

  

  return (
    <div class="layout">

  <div class="meddict-title">
    MEDICAL DICTIONARY
  </div>


  <div class="meddict-search">
    <label class="search-wrapper">
      <img src={glass} class="search-icon" alt="Search Icon"/>
      <input type="text" class="placeholder" id="searchInput" placeholder="Search for the antidote to curiosity..."/>
      <div class="suggestions" id="suggestionBox"></div>
    </label>
  </div>


  <div class="meddict-button" id="searchButton" type="submit">
    Search
  </div>


  <div class="result-container" id="resultContainer">
  
    <div class="result-left">


      <div class="result-upper">
       
        <div class="sound-column">
          <button class="sound-button" onClick={playAudio}>
            <img src={sound} class="sound-icon" alt="Sound icon"/>
          </button>
        </div>

        <div class="result-card" id="inputCard"></div>
      </div>

   
      <div class="line"></div>

     
      <div class="result-lower">
       
        <div class="sound-column">
          <button class="sound-button" onClick={playAudio_res}>
            <img src={sound} class="sound-icon" alt="Sound icon"/>
          </button>
        </div>

       
        <div class="result-card" id="resultCard"></div>
      </div>

    </div>

    <div class="result-right">
    {imageUrl ? (
        <img src={imageUrl} alt="Result" class="result-image"/>
      ) : (
        <div class="no-image-text">
          illustration is being updated...
    </div>
    
      )}    </div>
  </div>

</div>


  );
};


export default SearchBar;
