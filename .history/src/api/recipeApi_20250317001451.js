import axios from "axios";

// Fetch Recipes API
const API_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"; 
const API_BASE_URL2="https://api.spoonacular.com/recipes/{id}/information";
co
const API_Key = "d81cdcb65c2045fbb17d55233087b697";

export const fetchRecipes = async (category = "", query = "") => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { 
        apiKey: API_Key,   
        query,             
        cuisine: category, 
        number: 10,        
      },
    });
    return response.data.results;  // Return recipe data (results)

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];  // Return an empty array if there's an error
  }
};

export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(API_BASE_URL2.replace("{id}", id), {
      params: {
        apiKey: API_Key,
      },
    });
    return response.data;  
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null; 
  }
};
