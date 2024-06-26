import React from 'react'
import { useState,useEffect } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
export const Saved_recipe = () => {
 
  const[savedRecipe,setsavedRecipe]=useState([])
  const userID=useGetUserID();
  useEffect(()=>{
    
    const fetchsavedRecipe=async()=>{
      try{

        const response =await axios.get(`https://recipeapp-backend-rkvm.onrender.com/recipes/savedRecipes/${userID}`)
        setsavedRecipe(response.data.savedRecipes)
      }
      catch(error)
      {
        console.log(error)
      }
    }
  
    fetchsavedRecipe();
  },[])

  return (
    <div className='recipe-text'>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipe.map((recipes)=>(
          <li key={recipes._id}>
            <div>
              <h2>{recipes.name}</h2>
    
            </div>
            <div className='instructions'>
              <p><b>Instructions: {recipes.instructions}</b></p>
            </div>
            <img src={recipes.imageURL} alt={recipes.name}/>
            <p><b>Cooking Time:{recipes.cookingTime} minutes</b></p>
          </li>
        ))}
      </ul>
    </div>
  )
}

