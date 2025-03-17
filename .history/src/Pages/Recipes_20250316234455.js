import React, { useEffect, useState } from 'react';
import { fetchRecipes } from "../api/recipeApi";
import { Link } from 'react-router-dom';
import "./Recipes.css"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]); // Local state for all recipes
  const dispatch = useDispatch();

  // Fetch all recipes on mount and limit to 20
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes(""); // Fetch all recipes, no category filter
        console.log("All recipes loaded:", data);
        setAllRecipes(data.slice(0, 20)); // Limit to 20 recipes
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, []); // Empty deps—runs once on mount

  const handleFavoriteClick = (recipe) => {
    dispatch(addFavorite(recipe));
  };

  return (
    <div className="recipes-container">
      <h2>All Recipes</h2>

      {/* All Recipes List */}
      <div className="recipes-list">
        {allRecipes.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          allRecipes.map((recipe) => (
            <div key={recipe._id} className="recipes-card"> {/* Changed to _id */}
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/${recipe._id}`}> {/* Changed to _id */}
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
