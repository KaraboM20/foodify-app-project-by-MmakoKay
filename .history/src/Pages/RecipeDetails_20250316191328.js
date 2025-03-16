import React from 'react';
import { useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { RecipeContext } from "../context/RecipeContext"; 


const RecipeDetails = () => {
  const { id } = useParams(); 
  console.log("Recipe ID:", id);

  const { recipes, setRecipes } = RecipeContext();
  const [recipe, setRecipe] = useState(recipes[id] || null);  

  useEffect(() => {
      const loadRecipeDetails = async () => {
          try {
              if (!recipes[id]) { // Fetch only if not already in context
                  console.log("Fetching recipe for ID:", id); 
                //   const data = await fetchRecipeDetails(id);
                  console.log("Fetched Recipe Data:", data);

                  setRecipes((prevRecipes) => ({ ...prevRecipes, [id]: data })); // Store in context
                  setRecipe(data);
              } else {
                  console.log("Loading from context:", recipes[id]);
                  setRecipe(recipes[id]);
              }
          } catch (error) {
              console.error("Error fetching recipe details:", error);
          }
      };

      if (id) loadRecipeDetails();
  }, [id, recipes, setRecipes]);

  if (!recipe) {
      return <p>Loading recipe details...</p>;
  }

  return (
      <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.instructions}</p>
      </div>
  );
};

export default RecipeDetails;