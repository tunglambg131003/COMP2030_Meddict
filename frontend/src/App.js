import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import SearchPage from "./Pages/SearchPage";
import {useEffect} from "react"

function App() {
    useEffect(() => {
        window.history.scrollRestoration = 'manual'
    }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/searchpage" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
