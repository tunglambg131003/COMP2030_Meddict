// MedDictionaryComponent.js
import React, { useState, useEffect, useRef } from 'react';
import "../Styles/MeddictSearchBar.css"
import { useTranslation } from 'react-i18next'
import sound from "../Assets/sound.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  // State variables
  const { t } = useTranslation();
  const [lang, setLang] = useState('en');
  const [imageUrl, setImageUrl] = useState(''); // State variable for storing the image URL
  const [audioUrl, setAudioUrl] = useState('');
  const [audioUrl_res, setAudioUrl_res] = useState('');
  const typingTimerRef = useRef(null);
  const showTimeRef = useRef(null);

  useEffect(() => {
    // Section 1: Event Listeners and Variables
    const searchButton = document.getElementById('searchButton');
    const suggestionBox = document.getElementById('suggestionBox');
    let selectedSuggestionIndex = -1;
    const searchInput = document.getElementById('searchInput');
    const doneTypingInterval = 1000; // Adjust this interval as needed

    // Section 2: Input Event Listener
    const inputEventListener = function () {
      clearTimeout(typingTimerRef.current);
      const inputValue = searchInput.value.trim();

      typingTimerRef.current = setTimeout(async () => {
        // Section 3: Fetch Suggestions
        try {
          if (lang === "en"){
            // English language
            const response = await fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue));
            const userData = await response.json();
            const filteredSuggestions = userData
                .filter(user => user.en.toLowerCase().startsWith(inputValue.toLowerCase()))
                .map(user => user.en);
            displaySuggestions(filteredSuggestions);
            suggestionBox.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
            adjustSearchInputStyle(filteredSuggestions.length > 0);
          }
          else if (lang === "vn"){
            // Vietnamese language
            const response = await fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=vn&pattern=' + inputValue));
            const userData = await response.json();
            const filteredSuggestions = userData
                .filter(user => user.vn.toLowerCase().startsWith(inputValue.toLowerCase()))
                .map(user => user.vn);
            displaySuggestions(filteredSuggestions);
            suggestionBox.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
            adjustSearchInputStyle(filteredSuggestions.length > 0);

          }

        } catch (error) {
          // Handle errors
          console.error('Error fetching suggestions:', error);
        }
      }, doneTypingInterval);
    };

    // Section 4: Add Event Listeners
    searchInput.addEventListener('input', inputEventListener);

    // Section 5: Style Adjustment Functions
    function adjustSearchInputStyle(hasSuggestions) {
      if (hasSuggestions) {
        searchInput.style.borderRadius = '0';
      } else {
        searchInput.style.borderRadius = '0';
      }
    }

    function resetSearchInputStyle() {
      searchInput.style.borderRadius = '0';
    }

    // Section 6: Keyboard Events
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

    document.addEventListener('click', function (event) {
      suggestionBox.style.display = 'none';
      resetSearchInputStyle();
    });

    // Section 7: Highlight Selected Suggestion
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

    // Section 8: Display Suggestions Function
    function displaySuggestions(filteredSuggestions) {
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

    // Section 9: Click Event Listener for Search Button
    searchButton.addEventListener('click', function () {
      performSearch();
    });

    // Section 10: Perform Search Function
    async function performSearch() {
      const inputValue = searchInput.value.trim();
      const resultContainer = document.getElementById('resultContainer');
      const inputCard = document.getElementById('inputCard');
      const resultCard = document.getElementById('resultCard');
      const interval = 1000;

      setImageUrl(null);

      if (inputValue.length !== 0) {
        clearTimeout(showTimeRef.current)
        if (lang === "en"){
          showTimeRef.current = setTimeout(() => {
            fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=en&pattern=' + inputValue))
                .then(async (response) => {
                  const userData = response.json();
                  return userData;
                })
                .then(async (userData) => {
                  const matchingUser = userData.find(user => user.en.toLowerCase() === inputValue.toLowerCase());
                  return matchingUser;
                })
                .then(async(matchingUser) => {
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

                  // Scroll into view
                  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
          }, interval);
        }
        else if (lang === "vn"){
          showTimeRef.current = setTimeout(() => {
            fetch(encodeURI('https://api.meddict-vinuni.com/words?lang=vn&pattern=' + inputValue))
                .then(async (response) => {
                  const userData = response.json();
                  return userData;
                })
                .then(async (userData) => {

                  const matchingUser = userData.find(user => {
                    return user.vn.toLowerCase().localeCompare(inputValue.toLowerCase(), 'vi') || user.vn.toLowerCase() === inputValue.toLowerCase();

                  })
                  return matchingUser;
                })
                .then(async(matchingUser) => {
                  resultContainer.classList.remove('show');
                  inputCard.classList.remove('show');
                  resultCard.classList.remove('show');

                  if (matchingUser) {
                    // Section 13.3: Display the input in the upper card
                    inputCard.innerHTML = `${inputValue}`;

                    // Section 13.4: Display the result in the lower card
                    resultCard.innerHTML = `${matchingUser.en}`;

                    // Show the result box smoothly
                    resultContainer.classList.add('show');

                    // Show the result cards smoothly
                    inputCard.classList.add('show');
                    resultCard.classList.add('show');

                    fetch(encodeURI('https://api.meddict-vinuni.com/words/illustration/' + matchingUser.id))
                        .then(response => response.blob())
                        .then(blob => {
                          const imageUrl = URL.createObjectURL(blob);
                          console.log(imageUrl);
                          setImageUrl(imageUrl);
                        });

                    fetch(encodeURI('https://api.meddict-vinuni.com/words/sound/vn/' + matchingUser.id))
                        .then((response) => response.blob())
                        .then((blob) => {
                          const audioUrl = URL.createObjectURL(blob);
                          console.log(audioUrl);
                          setAudioUrl(audioUrl);
                        });

                    fetch(encodeURI('https://api.meddict-vinuni.com/words/sound/en/' + matchingUser.id))
                        .then((response) => response.blob())
                        .then((blob) => {
                          const audioUrl_res = URL.createObjectURL(blob);
                          console.log(audioUrl_res);
                          setAudioUrl_res(audioUrl_res);
                        });
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

                  // Scroll into view
                  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
          }, interval)
        }
      }
      suggestionBox.style.display = 'none';
      resetSearchInputStyle();
      selectedSuggestionIndex = -1;
    }
  });

  // Section 14: Play audio
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

  // Section 15: Return JSX
  return (
      <div className="layout">

        <div className="meddict-title">{t("title")}</div>

        <div className="meddict-search">
          <label className="search-wrapper">
            <div className="language-search">
              <select className="language-swap" onChange={(e) => setLang(e.target.value)}>
                <option value="en">EN - VI</option>
                <option value="vn">VI - EN</option>
              </select>
            </div>

            <input type="text" className="placeholder" id="searchInput" placeholder={t("input")}/>

            <div className="meddict-button" id="searchButton">
              <FontAwesomeIcon icon={faSearch} className="icon" />
            </div>

            <div className="suggestions" id="suggestionBox"></div>
          </label>
        </div>

        <div className="result-container" id="resultContainer">
          <div className="result-left">
            <div className="result-upper">
              <div className="sound-column">
                <button className="sound-button" onClick={playAudio}>
                  <img src={sound} className="sound-icon" alt="Sound icon"/>
                </button>
              </div>

              <div className="result-card" id="inputCard"></div>
            </div>

            <div className="line"></div>

            <div className="result-lower">
              <div className="sound-column">
                <button className="sound-button" onClick={playAudio_res}>
                  <img src={sound} className="sound-icon" alt="Sound icon"/>
                </button>
              </div>

              <div className="result-card" id="resultCard"></div>
            </div>
          </div>

          <div className="result-right">
            {imageUrl ? (
                <img src={imageUrl} alt="Result" className="result-image"/>
            ) : (
                <div className="no-image-text">
                  {t("illustration")}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default SearchBar;
