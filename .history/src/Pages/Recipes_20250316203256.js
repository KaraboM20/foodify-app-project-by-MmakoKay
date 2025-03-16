import React, { useEffect, useState } from 'react';
import { fetchRecipes } from "../api/recipeApi";
import { Link } from 'react-router-dom';
import "./Recipes.css"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoritesSlice';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]); // Local state for all recipes
  const [groupedRecipes, setGroupedRecipes] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
  });
  const dispatch = useDispatch();

  // Fetch all recipes on mount
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes(""); // Fetch all recipes, no category filter
        console.log("All recipes loaded:", data);
        setAllRecipes(data); // Store in local state
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, []); // Empty deps—runs once on mount

  // Group recipes by category whenever allRecipes changes
  useEffect(() => {
    if (allRecipes.length > 0) {
      const grouped = {
        breakfast: [],
        lunch: [],
        dinner: [],
        dessert: [],
      };

      allRecipes.forEach((recipe) => {
        if (recipe.category) {
          if (recipe.category === 'breakfast') {
            grouped.breakfast.push(recipe);
          } else if (recipe.category === 'lunch') {
            grouped.lunch.push(recipe);
          } else if (recipe.category === 'dinner') {
            grouped.dinner.push(recipe);
          } else if (recipe.category === 'dessert') {
            grouped.dessert.push(recipe);
          }
        }
      });

      setGroupedRecipes(grouped);
    }
  }, [allRecipes]);

  const handleFavoriteClick = (recipe) => {
    dispatch(addFavorite(recipe));
  };

  return (
    <div className="recipes-container">
      <h2>All Recipes</h2>
      
      {/* Breakfast Section */}
      <h3>Breakfast</h3>
      <div className="recipes-list">
        {groupedRecipes.breakfast.length === 0 ? (
          <p>No breakfast recipes available.</p>
        ) : (
          groupedRecipes.breakfast.map((recipe) => (
            <div key={recipe._id} className="recipes-card"> {/* Changed to _id */}
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/${recipe._id}`}> {/* Changed to _id */}
                  <button className="recipe-link">View Details</button>
                </Link>
                <button className="recipe-icon" onClick={() => handleFavoriteClick(recipe)}
>
  <FaRegHeart />
</button>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Lunch Section */}
      <h3>Lunch</h3>
      <div className="recipes-list">
        {groupedRecipes.lunch.length === 0 ? (
          <p>No lunch recipes available.</p>
        ) : (
          groupedRecipes.lunch.map((recipe) => (
            <div key={recipe._id} className="recipes-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/${recipe._id}`}>
                  <button className="recipe-link">View Details</button>
                </Link>
                <Link to='/favourites' className="recipe-icon">
                  <FaRegHeart />
                </Link>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Dinner Section */}
      <h3>Dinner</h3>
      <div className="recipes-list">
        {groupedRecipes.dinner.length === 0 ? (
          <p>No dinner recipes available.</p>
        ) : (
          groupedRecipes.dinner.map((recipe) => (
            <div key={recipe._id} className="recipes-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/${recipe._id}`}>
                  <button className="recipe-link">View Details</button>
                </Link>
                <Link to='/favourites' className="recipe-icon">
                  <FaRegHeart />
                </Link>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Dessert Section */}
      <h3>Dessert</h3>
      <div className="recipes-list">
        {groupedRecipes.dessert.length === 0 ? (
          <p>No dessert recipes available.</p>
        ) : (
          groupedRecipes.dessert.map((recipe) => (
            <div key={recipe._id} className="recipes-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/${recipe._id}`}>
                  <button className="recipe-link">View Details</button>
                </Link>
                <Link to='/favourites' className="recipe-icon">
                  <FaRegHeart />
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;