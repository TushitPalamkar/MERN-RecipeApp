import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
export const Home = () => {
  const[recipe,setRecipe]=useState([]);
  const[savedRecipe,setsavedRecipe]=useState([])
  const userID=useGetUserID();
  useEffect(()=>{
    const fetchRecipe=async()=>{
      try{
        const response=await axios.get("http://localhost:3001/recipes")
        setRecipe(response.data)
        console.log(response.data)
      }
      catch(error)
      {
        console.error(error)
      }
    }
    const fetchsavedRecipe=async()=>{
      const response =await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
      setsavedRecipe(response.data.savedRecipes)
    }
    fetchRecipe();
    fetchsavedRecipe();
  },[])
  const saveRecipe=async(recipeID)=>{
    await axios.put("http://localhost:3001/recipes",{recipeID,userID})
  }
  const issavedRecipe=(id)=>{
    return savedRecipe.includes(id);
  };
  return (
    <div className='recipe-text'>
      <h2>Recipes</h2>
      <ul>
        {recipe.map((recipes)=>(
          <li key={recipes._id}>
            {savedRecipe.includes(recipes._id)&& <h1>Already Saved!</h1>}
            <div>
              <h2>{recipes.name}</h2>
              <button className='save-recipe' onClick={()=>saveRecipe(recipes._id)} disabled={issavedRecipe(recipes._id)}>
                {issavedRecipe(recipes._id)?"Saved":"Save Recipe!"}</button>
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
