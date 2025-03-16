import React, { createContext, useState } from "react";
import { fetchRecipes } from "../api/recipeApi"; 

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false); 
  

  
  const searchRecipes = async (query) => {
    if (!query.trim()) return; // Prevent empty searches

    try {
      setIsSearching(true);
      const results = await fetchRecipes(query);
      setRecipes(results.length > 0 ? results : []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsSearching(false);
    }
  }; 

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, isSearching, setIsSearching, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};