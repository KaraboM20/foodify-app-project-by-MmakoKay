import React from 'react';
import { NavLink } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  return (
    <div>
      <h3>You do not have Favourites</h3>
      <NavLink to='./home'><button className='notification-button'>Continue Viewing Recipes</button></NavLink>
            
    </div>
  )
}

export default Favourites