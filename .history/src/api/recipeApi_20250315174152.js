import axios from "axios";

// Fetch Recipes API
const API_BASE_URL = "http://localhost:3000/recipes"; 


export const fetchRecipes = async (category = "", query = "") => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { category, search: query }, 
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; 
    }
  };