import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipes } from '../api/recipeApi';
import './Recipe.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        console.log("URL ID:", id); // Check the ID from the URL
        const allRecipes = await fetchRecipes("");
        console.log("Fetched recipes:", allRecipes); // Check API response
        const selectedRecipe = allRecipes.find((r) => {
          console.log("Comparing:", r._id, "with", id); // Debug each comparison
          return r._id === id;
        });
        console.log("Selected recipe:", selectedRecipe); // Check result
        if (selectedRecipe) {
          setRecipe(selectedRecipe);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to load recipe details");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div className="recipe-info-container">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-photo" />
      <h3 className="recipe-category">Category: {recipe.category}</h3>
      <h3 className="ingredients-header">Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">{ingredient}</li>
        ))}
      </ul>
      <h3 className="instructions-header">Instructions:</h3>
      <p className="recipe-steps">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;