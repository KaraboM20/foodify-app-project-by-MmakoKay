import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  if (favorites.length === 0) {
    return (
      <div>
        <h3>You do not have any favourites yet</h3>
        <NavLink to="/">
          <button className="favourites-button">Continue Viewing Recipes</button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="favourites-container">
      <h2>Your Favourite Recipes</h2>
        <div className="favourites-list">
          {favorites.map((recipe) => (
            <div key={recipe._id} className="favourite-item">
              <img src={recipe.image} alt={recipe.name} className="favourite-image" />
              <h3>{recipe.name}</h3>
              <div className="favourite-actions">
                <NavLink to={`/${recipe._id}`}>
                  <button className="view-details-btn">View Details</button>
                </NavLink>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFavorite(recipe._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Favorites;