import React from 'react';
import { useContext, useEffect, useState } from 'react';
import './RecipeLists.css';
import { Link } from "react-router-dom"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { FaHeart } from "react-icons/fa";
import { RecipeContext } from '../context/RecipeContext';
import { fetchRecipes } from '../api/recipeApi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';


const RecipeLists = () => {
  const { recipes, setRecipes, isSearching } = useContext(RecipeContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        if (!isSearching && recipes.length === 0) {
          // Load all recipes initially if not searching
          const data = await fetchRecipes("");
          console.log("Initial recipes:", data);
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
                {isFavorite(recipe._id) ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
  


export default RecipeLists
