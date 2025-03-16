import React from 'react'
import { NavLink } from 'react-router-dom'
import './Notifications.css';

const Notifications = () => {
  return (
    <div>
      <h3>You currently dont have Notifications</h3>
      <NavLink to='./home'><button className='notification-button'>Continue Viewing Recipes</button></NavLink>
      
    </div>
  )
}

export default Notifications