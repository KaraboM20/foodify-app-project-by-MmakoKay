import axios from "axios";

// Fetch Recipes API
const API_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"; 
const API_Key = "d81cdcb65c2045fbb17d55233087b697"


export const fetchRecipes = async (category = "", query = "") => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { 
          apiKey: API_KEY,   // Add your API key
        query,             // Search term
        cuisine: category, // Filter by category (optional)
        number: 10, 
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; 
    }
  };