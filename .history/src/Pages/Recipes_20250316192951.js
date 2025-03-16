import React, { useEffect, useState } from 'react';
import { fetchRecipes } from "../api/recipeApi";
import { Link } from 'react-router-dom';
import "./Recipes.css"; 
import { FaRegHeart } from 'react-icons/fa'; 

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [groupedRecipes, setGroupedRecipes] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
  });

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes(""); // Fetch all recipes
        console.log("Fetched recipes:", data); // Debug the data
        setAllRecipes(data);
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, []);

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
            <div key={recipe._id} className="recipes-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <span className="recipe-icons">
                <Link to={`/recipe/${recipe._id}`}>
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
      {/* Repeat for lunch, dinner, dessert sections */}
      {/* ... (keeping your existing code for brevity) */}
    </div>
  );
};

export default Recipes;