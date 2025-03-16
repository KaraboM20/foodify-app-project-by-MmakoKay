import React from 'react';
import { useContext, useEffect } from 'react';
import './RecipeLists.css';
import { Link } from "react-router-dom"; 
import { FaRegHeart } from 'react-icons/fa'; 
import { RecipeContext } from '../context/RecipeContext';
import { fetchRecipes } from '../api/recipeApi';


const RecipeLists = () => {
  const { recipes, setRecipes, isSearching, query } = useContext(RecipeContext);

  useEffect(() => {
    const loadRecipes = async () => {
      if (isSearching && query.trim() !== "") {
        // If searching, fetch recipes based on search query
        const data = await fetchRecipes("", query);
        setRecipes(data);
      } else if (!isSearching && recipes.length === 0) {
        // If not searching, load all popular recipes
        const data = await fetchRecipes("popular");
        setRecipes(data);
      }
    };

    
      loadRecipes(); 
  }, [isSearching, recipes, setRecipes, query]);

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
            <Link to={`/recipe/${recipe.id}`}>
            <button className="recipe-link">View Details</button>
            </Link>
            <Link to='/favourites' className="recipe-icon">
            <FaRegHeart  />
            </Link>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
  


export default RecipeLists
