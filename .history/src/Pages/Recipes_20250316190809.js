import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the _id from URL
import { fetchRecipes } from '../api/recipeApi'; // Adjust path if needed
import './RecipeDetails.css'; // Create this for styling

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe _id from URL (e.g., /recipe/12345)
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Fetch all recip
        const allRecipes = await fetchRecipes(""); // No filters
        const selectedRecipe = allRecipes.find((r) => r._id === id);
        
        if (selectedRecipe) {
          setRecipe(selectedRecipe);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to load recipe details");
        console.error("Error fetching recipe:", err);
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
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <h3>Category: {recipe.category}</h3>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;