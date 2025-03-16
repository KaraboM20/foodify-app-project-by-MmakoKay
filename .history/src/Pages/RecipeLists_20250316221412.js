import React, { useContext, useEffect, useState } from 'react';
import './RecipeLists.css';
import { Link } from "react-router-dom"; 
import { FaRegHeart, FaHeart } from 'react-icons/fa'; 
import { RecipeContext } from '../context/RecipeContext';
import { fetchRecipes } from '../api/recipeApi';

const RecipeLists = () => {
  const { recipes, setRecipes, isSearching } = useContext(RecipeContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        if (!isSearching && recipes.length === 0) {
          const data = await fetchRecipes("");
          setRecipes(data);
        }
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };
    loadRecipes();
  }, [setRecipes]);

  const handleFavoriteClick = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav._id === recipe._id)) return prev;
      return [...prev, recipe];
    });
    console.log("Added to favorites:", favorites);
  };

  const isFavorite = (recipeId) => favorites.some((fav) => fav._id === recipeId);

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <span className="recipe-icons">
              <Link to={`/${recipe._id}`}>
                <button className="recipe-link">View Details</button>
              </Link>
              <button className="recipe-icon" onClick={() => handleFavoriteClick(recipe)}>
                {isFavorite(recipe._id) ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeLists;