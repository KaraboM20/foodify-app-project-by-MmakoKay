import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeById } from '../api/recipeApi';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        console.log("URL ID:", id);
        const data = await fetchRecipeById(id);
        console.log("Fetched recipe:", data);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe details");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleClose = (e) => {
    
    if (e.target.classList.contains('recipe-details-overlay')) {
      navigate('/recipes'); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div 
      className="recipe-details-overlay" 
      onClick={handleClose} 
    >
    <div className="recipe-info-container" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

export default RecipeDetails;