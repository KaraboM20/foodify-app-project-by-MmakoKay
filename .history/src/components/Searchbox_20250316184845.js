import React from 'react';
import { FaSearch } from "react-icons/fa";
import './Searchbox.css';
import { useState, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";


const Searchbox = () => {
  const { searchRecipes } = useContext(RecipeContext);
  const [query, setQuery] = useState(""); 

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery);
    searchRecipes(trimmedQuery);
  };

  // Trigger search on "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbox-section">
      <h1>Your desired dish?</h1>

      <div className="header_search">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for "Enter"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <h5>Search any recipe e.g burger, pizza, sandwich, toast</h5>
    </div>
  );
};

export default Searchbox;