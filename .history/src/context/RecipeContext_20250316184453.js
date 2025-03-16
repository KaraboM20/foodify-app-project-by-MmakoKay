import React, { createContext, useState } from "react";
import { fetchRecipes } from "../api/recipeApi"; 

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false); 
  const [query, setQuery] = useState("");

  
  const searchRecipes = async (searchQuery) => {
    setIsSearching(true); 
    setQuery(searchQuery); 
    try {
      const data = await fetchRecipes("", searchQuery); 
      console.log("Search results:", data);
      setRecipes(data); // Update recipes
    } catch (error) {
      console.error("Search error:", error);
      setRecipes([]);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, isSearching, setIsSearching, query, setQuery, searchRecipes}}>
      {children}
    </RecipeContext.Provider>
  );
};