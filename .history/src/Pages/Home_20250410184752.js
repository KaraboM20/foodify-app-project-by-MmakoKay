import React from 'react'
import './Home.css';
import RecipeLists from './RecipeLists';
import Searchbox from '../components/Searchbox';
import { useState, useEffect } from "react";
import { fetchRecipes } from "../api/recipeApi";


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes();
        console.log("Fetched recipes", data)
        setRecipes(data); 
      } catch (error) {
        console.error("Failed to load recipes", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <>
     <Searchbox /> 
    <RecipeLists recipes={recipes} />
   </> 
  )
}

export default Home
