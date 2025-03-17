import axios from "axios";

// Fetch Recipes API
const API_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"; 
const API_Key = "d81cdcb65c2045fbb17d55233087b697";

export const fetchRecipes = async (category = "", query = "") => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { 
        apiKey: API_Key,   // API Key for Spoonacular
        query,             // Search term (optional)
        cuisine: category, // Cuisine category (optional)
        number: 10,        // Number of results to return (optional)
      },
    });
    return response.data.results;  // Return recipe data (results)

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];  // Return an empty array if there's an error
  }
};
