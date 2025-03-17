import axios from "axios";

// Fetch Recipes API
const API_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"; 
const API_Key = "d81cdcb65c2045fbb17d55233087b697"


export const fetchRecipes = async (category = "", query = "") => {
    try {
      
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; 
    }
  };