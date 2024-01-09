// MedDictionaryComponent.js
import React, { useState, useEffect } from 'react';
import "../Styles/MeddictSearchBar.css"

import glass from "../Assets/glass.png"
import sound from "../Assets/sound.png"

const SearchBar = () => {
  const [imageUrl, setImageUrl] = useState(''); // State variable for storing the image URL
  const [audioUrl, setAudioUrl] = useState('');
  const [audioUrl_res, setAudioUrl_res] = useState('');
  
  
  useEffect(() => {
    const searchInput = document.getElementById('searchInput');
    const suggestionBox = document.getElementById('suggestionBox');
    const searchButton = document.getElementById('searchButton');
    let selectedSuggestionIndex = -1;
    let typingTimer; // Timer identifier
  const doneTypingInterval = 900; // Time in milliseconds (1 second)
  let isFetchingSuggestions = false;
    const debounce = (func, delay) => {
      let timeoutId;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
      };
    };
    
     
   // Add this code to scroll to the top on page reload
   
    
    // Section 2: Input Event Listener
    searchInput.addEventListener('input', debounce(async function () {
      const inputValue = searchInput.value.trim();
  
      // Section 2.1: Handle Empty Input
      if (inputValue === '') {
        suggestionBox.style.display = 'none';
        resetSearchInputStyle();
        return;
      }
       if (isFetchingSuggestions) {
      return;
    }

    // Clear previous timer
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      try {
        // Section 3: Fetch Suggestions from API
        const response = await fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue));
        const userData = await response.json();
      
        // Section 4: Extract and Filter Suggestions
        const userNames = userData.map(user => user.en);
        const filteredSuggestions = userNames.filter(name =>
          name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
      
        // Section 5: Display Suggestions
        displaySuggestions(filteredSuggestions);
      
        // Section 6: Show/Hide Suggestions Box
        suggestionBox.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        selectedSuggestionIndex = -1;
        highlightSelectedSuggestion();
        adjustSearchInputStyle(filteredSuggestions.length > 0);
      
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }finally {
        // Reset the flag when suggestions fetching is complete
        isFetchingSuggestions = false;
      }
      }, doneTypingInterval);
      
      
    },500));
    
  
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
      } else if (event.key === 'Enter') {
        event.preventDefault();
  
        if (selectedSuggestionIndex !== -1) {
          // If a suggestion is selected, use it
          searchInput.value = suggestions[selectedSuggestionIndex].textContent;
        }
  
        // Trigger the search
        performSearch();
      }
  
      highlightSelectedSuggestion();
    });
  
    // Section 9: Hide Suggestions Box on Click Outside
    document.addEventListener('click', function (event) {
      if (!searchInput.contains(event.target) && !suggestionBox.contains(event.target)) {
        suggestionBox.style.display = 'none';
        resetSearchInputStyle();
      }
    });
  
    // Section 10: Highlight Selected Suggestion
    function highlightSelectedSuggestion() {
      const suggestions = document.querySelectorAll('.suggestions .suggestion');
      suggestions.forEach((suggestion, index) => {
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
    function displaySuggestions(filteredSuggestions) {
      suggestionBox.innerHTML = '';
      filteredSuggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', function () {
          searchInput.value = suggestion;
          suggestionBox.style.display = 'none';
          resetSearchInputStyle();
        });
        suggestionBox.appendChild(suggestionItem);
      });
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
  
      if (inputValue !== '') {
        try {
          // Section 13.1: Fetch user data from the provided URL
          // console.log(encodeURI('http://api.meddict.com/word?lang=en&pattern=' + inputValue));
          const response = await fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue));
          const userData = await response.json();
          console.log(userData);
          // Section 13.2: Find the user with the matching name
          const matchingUser = userData.find(user => user.en.toLowerCase() === inputValue.toLowerCase());
        
          // Remove 'show' class to enable smooth transition for subsequent searches
          resultContainer.classList.remove('show');
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
  
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
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
      <img src={imageUrl} alt="Result" class="result-image"/>
    </div>
  </div>

</div>


  );
};


export default SearchBar;

