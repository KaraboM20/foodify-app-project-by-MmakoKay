import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FaRegHeart } from 'react-icons/fa';  // Import Heart icon
import { IoMdNotificationsOutline } from 'react-icons/io'; // Import Notification icon



const Header = () => {

  return (
    <div className='header'>
      {/* Logo */}
        <img 
      className='header_logo'
      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP36DaEnA76M-Y2L_VyAHqiLdvUGmNwxAFUA&s' alt="Foodify logo" />

      <div className='nav-pages'>
        <ul>
          <li>
            <NavLink to='./home'>Home</NavLink>
          </li>
          <li>
            <NavLink to='./recipes'>Recipes</NavLink>
          </li>
        </ul>
      </div>

      {/* Header-icons */}
      <div className="header_option">
          <NavLink activeClassName='active' to='/favourites'><span className='header-option1'><FaRegHeart title="Favourites" />Favourites</span></NavLink>
          <NavLink activeClassName='active' to='/notifications'><span className='header-option2'><IoMdNotificationsOutline title="notification"/>Notifications</span></NavLink>
     </div>
    </div>
  );
};

export default Header

