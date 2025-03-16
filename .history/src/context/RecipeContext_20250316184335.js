import React, { createContext, useState } from "react";
import { fetchRecipes } from "../api/recipeApi"; 

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false); 
  const [query, setQuery] = useState("");

  
  

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, isSearching, setIsSearching, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};