import React, { useEffect, useState } from 'react';
import { fetchRecipes } from "../api/recipeApi";
import { Link } from 'react-router-dom';
import "./Recipes.css"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]); 
  const dispatch = useDispatch();

  // Fetch all recipes on mount
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes(""); 
        console.log("All recipes loaded:", data);
        setAllRecipes(data.slice(0, 20)); 
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, []); 

  const handleFavoriteClick = (recipe) => {
    dispatch(addFavorite(recipe));
  };

  return (
    <div className="recipes-container">
      <h2>All Recipes</h2>
      <div className="recipes-list">
        {allRecipes.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          allRecipes.map((recipe) => (
            <div key={recipe._id} className="recipes-card"> 
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3>{recipe.title}</h3>
              <span className="recipe-icons">
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
    </div>
  );
};

export default Recipes;
