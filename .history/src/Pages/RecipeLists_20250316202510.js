import React from 'react';
import { useContext, useEffect } from 'react';
import './RecipeLists.css';
import { Link } from "react-router-dom"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { RecipeContext } from '../context/RecipeContext';
import { fetchRecipes } from '../api/recipeApi';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';


const RecipeLists = () => {
  const { recipes, setRecipes, isSearching, query } = useContext(RecipeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        if (!isSearching && recipes.length === 0) {
          // Load all recipes initially if not searching
          const data = await fetchRecipes("");
          console.log("Initial recipes:", data);
          setRecipes(data);
        }
        // No else needed—searchRecipes in context handles search case
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, [setRecipes]);

  const handleFavoriteClick = (recipe) => {
    dispatch(addFavorite(recipe)); 
  };

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found. Try searching for a dish above.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <span className='recipe-icons'>
            <Link to={`/${recipe._id}`}>
            <button className="recipe-link">View Details</button>
            </Link>
            <button className="recipe-icon" onClick={() => handleFavoriteClick(recipe)}>
                <FaRegHeart />
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
  


export default RecipeLists
